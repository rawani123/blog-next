import dbConnection from "@/config/db";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dbConnection();
export const POST = async(req:NextRequest)=>{
    try {
        const body = await req.json();
        const {email,password}=body;
        if(!email || !password){
            return NextResponse.json({message:"Please fill all the fields"},{status:400})
        }
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"User does not exist"},{status:400})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return NextResponse.json({message:"Invalid credentials"},{status:400})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET!,{expiresIn:"1d"});
        const res = NextResponse.json({message:`Welcome Back ${user.username}`},{status:200});
        res.cookies.set("token",token,{httpOnly:true});
        return res;

    } catch (error:any) {
       return NextResponse.json({message:error.message},{status:500}) 
    }
}