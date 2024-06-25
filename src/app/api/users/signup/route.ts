import dbConnection from "@/config/db";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcrypt";

dbConnection();
export const POST = async(req:NextRequest)=>{
    try {
        const body= await req.json();
        const {username,email,password}=body;
        if(!username || !email || !password){
            return NextResponse.json({message:"Please fill all the fields"},{status:400})
        }
        const userNameExists= await User.findOne({username});
        if(userNameExists){
            return NextResponse.json({message:"Username already exists"},{status:400})
        }
        const emailExists= await User.findOne({email});
        if(emailExists){
            return NextResponse.json({message:"Email already exists"},{status:400})
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        const user = await new User({username,email,password:hashedPassword}).save();
        return NextResponse.json({message:"User registered successfully"},{status:200})
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}