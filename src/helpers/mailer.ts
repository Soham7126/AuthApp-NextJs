import nodemailer from "nodemailer"; 
import User from "../models/usermodel";
import bcryptjs from "bcryptjs";

export const sendemail = async({email, emailType, userId}: any) => {
    try {
        const hashedtoken = await bcryptjs.hash(userId.toString(), 10)

    if(emailType === "VERIFY"){
        await User.findbyIdAndUpdate(userId, {
            VerifyToken: hashedtoken, 
            verifytokenexpiry: Date.now() + 3600000
        })
    }else if(emailType === "RESET"){
        await User.findbyIdAndUpdate(userId, {
            forgotpasswordtoken: hashedtoken, 
            forgotpasswordtokenexpiry: Date.now() + 3600000
        })
    }

    const transporter = nodemailer.createTransport({
         host : "sandbox.smth.mailtrap.io", 
         port: 2525, 
         auth: {
            user: "c9easpfyvv0er", 
            pass: "fjewkvwvefuvgewm"
         }
    })

    const mailopton = { 
        from: "something@example.com", 
        to: email, 
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html : `<p>Click <a href = "${process.env.domain}/verfyemail?token=${hashedtoken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>`
    }

    const mailresponse = await transporter.sendMail(mailopton)
    return mailresponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}