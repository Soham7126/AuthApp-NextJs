import { error } from "console";
import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.mongo_url!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("mongodb connected successfully")
        })

        connection.on("error", (err)=> {
            console.log("please make sure mongodb is connected" + err)
            process.exit()
        })
    } catch (error) {
        console.log(error)   
    }
}