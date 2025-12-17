import { getdatafromtoken } from "@/src/helpers/getDatafromtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/usermodel";
import {connect} from "@/src/app/dbconfig/dbconfig";
connect()

export async  function GET(request:NextRequest){
    try {
        const userId = await getdatafromtoken(request);
        const findingid = await User.findOne({_id:userId})

        return NextResponse.json({
            message: "userfound",data: findingid 
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 404})
    }
}