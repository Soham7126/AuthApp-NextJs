import {connect} from "@/src/app/dbconfig/dbconfig";
import User from "@/src/models/usermodel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendemail } from "@/src/helpers/mailer";
connect()


export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json(); 
        const {username, password, email} = reqbody

        // Validation
        if(!username || !password || !email) {
            return NextResponse.json({error: "All fields are required"}, {status: 400})
        }

        if(password.length < 6) {
            return NextResponse.json({error: "Password must be at least 6 characters"}, {status: 400})
        }

        // Check if user exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 409})
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedpassword = await bcryptjs.hash(password, salt)

        // Create user
        const newUser = new User({
            username, 
            password: hashedpassword, 
            email
        })

        const savedUser = await newUser.save()

        // Send verification email
        await sendemail({email, emailType: "VERIFY", userId: savedUser._id})

        // Return response without password
        return NextResponse.json({
            message: "User created successfully", 
            success: true,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        }, {status: 201})
        
    } catch (error: any) {
        console.error("Signup error:", error)
        return NextResponse.json({error: error.message || "Something went wrong"}, {status: 500})
    }
}