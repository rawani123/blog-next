import Blog from "@/models/blog.model";
import dbConnection from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

type Params = {
  id: string;
};

export const DELETE = async (req: NextRequest, context: { params: Params}) => {
    try {
        const id = context.params.id;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}