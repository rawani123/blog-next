import User from "@/models/user.model";
import dbConnection from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

type Params = {
  id: string;
};

export const GET = async (req: NextRequest, context: { params: Params }) => {
  try {
    const id = context.params.id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};