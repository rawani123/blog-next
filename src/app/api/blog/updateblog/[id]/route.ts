import Blog from "@/models/blog.model";
import dbConnection from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

type Params = {
    id: string;
};


export const PUT= async (req: NextRequest, context: { params: Params }) => {
    try {
        const body = await req.json();
        const id = context.params.id;
        const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Blog updated successfully", data: blog }, { status: 200 });
    }
    catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}