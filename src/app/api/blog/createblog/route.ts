import Blog from "@/models/blog.model";
import dbConnection from "@/config/db";
import { NextRequest,NextResponse } from "next/server";


dbConnection();

export const POST = async (req:NextRequest)=>{
    try {
        const body = await req.json();
        const {title,caption,img}=body;
        if(!title || !caption || !img){
            return NextResponse.json({message:"Please fill all fields"},{status:400});
        }
        const blog = await Blog.create(body);
        return NextResponse.json({message:"Blog created successfully",data:blog},{status:201});
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}