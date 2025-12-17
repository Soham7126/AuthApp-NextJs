import {connect} from "@/src/app/dbconfig/dbconfig";
import User from "@/src/models/usermodel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connect()


export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json(); 
        const {username , password, email} = reqbody

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 404})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedpassword = await bcryptjs.hash(password, salt)

        const NewUser = new User({
            username , password: hashedpassword, email
        })

        const savedUser = await NewUser.save()

        return NextResponse.json({
            message: "user created successfully", 
            success: true, 
            savedUser
        })

        
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}