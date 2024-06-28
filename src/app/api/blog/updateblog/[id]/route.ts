import Blog from "@/models/blog.model";
import dbConnection from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises"; // Using fs.promises for async writeFile
import path from "path";

dbConnection();

type Params = {
  id: string;
};

export const PUT = async (req: NextRequest, context: { params: Params }) => {
  try {
    const body = await req.formData();
    const id = context.params.id;

    const title = body.get("title") as string | null;
    const caption = body.get("caption") as string | null;
    const img = body.get("img") as File | null;

    const updateFields: { [key: string]: any } = {};

    if (title) {
      updateFields.title = title;
    }

    if (caption) {
      updateFields.caption = caption;
    }

    if (img) {
      const buffer = await img.arrayBuffer();
      const imgFileName = `${title || "image"}.jpg`;
      const imgPath = path.join(process.cwd(), "public/images", imgFileName);
      try {
        await writeFile(imgPath, Buffer.from(buffer)); // Write Buffer to file
        updateFields.img = `/images/${imgFileName}`;
      } catch (writeError) {
        console.error("Error writing file:", writeError);
        return NextResponse.json({ message: "Error saving image file" }, { status: 500 });
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json({ message: "No fields to update" }, { status: 400 });
    }

    const blog = await Blog.findByIdAndUpdate(id, updateFields, { new: true });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated successfully", data: blog },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
