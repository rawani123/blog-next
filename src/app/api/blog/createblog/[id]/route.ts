import Blog from "@/models/blog.model";
import dbConnection from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import mongoose from "mongoose";
import { writeFile } from "fs/promises"; // Using fs.promises for async writeFile
import path from "path";

dbConnection();

type Params = {
  id: string;
};

export const POST = async (req: NextRequest, context: { params: Params }) => {
  try {
    const body = await req.formData();
    const id = new mongoose.Types.ObjectId(context.params.id);

    const title = body.get("title");
    const caption = body.get("caption");
    const img = body.get("img");



    if (!title || !caption || !img || typeof img === 'string') {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

      const file = img as File; // Asserting img as File
      
      const buffer = await file.arrayBuffer();
      const imgFileName = `${title}.jpg`;
      const imgPath = path.join(process.cwd(), "public/images", imgFileName);
      
      try {
        await writeFile(imgPath, Buffer.from(buffer)); // Write Buffer to file
      } catch (writeError) {
        console.error("Error writing file:", writeError);
        return NextResponse.json({ message: "Error saving image file" }, { status: 500 });
      }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const blog = new Blog({ title, caption, img: `/images/${imgFileName}`, user: user._id });
    await blog.save();

    user.blogs.push(blog._id);
    await user.save();

    return NextResponse.json(
      { message: "Blog created successfully", data: blog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
