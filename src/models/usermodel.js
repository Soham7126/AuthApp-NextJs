import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username : {
        type: String , 
        required: [true, "Please provide a userame"], 
        unique: true , 
        trim: true, 
        minchar: 4, 
    },
    email: {
        type: String, 
        required: [true, "please enter your email"], 
        unique: true
    }, 
    password: {
        type: String, 
        required: [true, "please enter your email"]
    }, 
    isVerified:{
        type: Boolean, 
        default: false
    }, 
    isAdmin: {
        type: Boolean, 
        default: false
    }
    ,
    forgotpasswordtoken: String , 
    forgotpasswordtokenexpiry: Date, 
    VerifyToken : String , 
    verifytokenexpiry: Date
})

const User = mongoose.model.users || mongoose.model
("users", userschema);

export default User