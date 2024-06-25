import User from "@/models/user.model";
import dbConnection from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export const GET = async (req: NextRequest) => {
    try {
        const users = await User.find().select("-password");
        return NextResponse.json({ data: users }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};