import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req:NextRequest) => {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get("userId")?.value || "";
    const isPublicPath = path === "/login" || path === "/signup";
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL("/",req.nextUrl));
    }
    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login",req.nextUrl));
    }
}

export const config = {
    matcher :[
        "/",
        "/myblog",
        "/createblog",
        "/updateblog/:path*",
        "/login",
        "/signup",
    ]
}