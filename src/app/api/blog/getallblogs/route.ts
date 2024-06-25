import Blog from "@/models/blog.model";
import dbConnection from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export const GET = async (req: NextRequest) => {
    try {
        const blogs = await Blog.find().populate("user");
        return NextResponse.json({ data: blogs }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};