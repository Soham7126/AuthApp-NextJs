import {connect} from "@/src/app/dbconfig/dbconfig";
import User from "@/src/models/usermodel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()


export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json(); 
        const {email, password} = reqbody

        // Validation
        if(!email || !password) {
            return NextResponse.json({error: "Email and password are required"}, {status: 400})
        }

        // Find user
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "Invalid credentials"}, {status: 401})
        }

        // Verify password
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword) {
            return NextResponse.json({error: "Invalid credentials"}, {status: 401})
        }

        // Create token (don't include password)
        const tokenData = { 
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })
        
        response.cookies.set("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400 // 1 day
        })
        
        return response
    } catch (error: any) {
        console.error("Login error:", error)
        return NextResponse.json({error: error.message || "Something went wrong"}, {status: 500}) 
    }
}