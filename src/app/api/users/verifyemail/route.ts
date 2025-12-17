import { connect } from "@/src/app/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/usermodel";

connect();

export async function POST(request: NextRequest) {
    try {
     const reqbody = await request.json()
     const {token} = reqbody

     const user = await User.findOne({VerifyToken: token, verifytokenexpiry: { $gt: Date.now() }})

     if(!user){
        return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
     }

     user.isVerified = true; 
     user.VerifyToken = undefined;
     user.verifytokenexpiry = undefined;
     await user.save();

     return NextResponse.json({message: "Email verified successfully"}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}