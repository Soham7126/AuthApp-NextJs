import {connect} from "@/src/app/dbconfig/dbconfig";
import User from "@/src/models/usermodel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()


export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json(); 
        const { email , password} = reqbody

        const findinguser = await User.findOne({email})

        if(!findinguser){
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        const tokendataa = { 
            id: findinguser._id,
            username: findinguser._username, 
            password: findinguser._password
        }

        const token = await jwt.sign(tokendataa, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })
        response.cookies.set("token", token, { httpOnly: true, secure: true, maxAge: 3600 })
        
        return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400}) 
    }
}