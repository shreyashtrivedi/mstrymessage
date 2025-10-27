import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request:Request){
    await dbConnect()

    try {
        const{username,email,password} = await request.json()
        const existinguserverifiedbyusername =  await UserModel.findOne({
            username,
            isVerified:true,
        })

        if(existinguserverifiedbyusername){
            Response.json({
                succes:false,
                message:"username is already taken",
            },{status:400})
        }

        const existinguserbyemail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000+Math.random()*900000).toString()
    
        if(existinguserbyemail){
            if(existinguserbyemail.isVerified){
                return Response.json({
                    succes:false,
                    message:"A user already exists with this email"
                },{status:400})
            } else{
                const hashedpassword = await bcrypt.hash(password,10)
                existinguserbyemail.password = hashedpassword;    //user exist to krta h to uske credentials change kra dete hai
                existinguserbyemail.verifyCode = verifyCode;
                existinguserbyemail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existinguserbyemail.save()
            }
        }
        else{
            const hashedpassword = await bcrypt.hash(password,10)
            const expirydate = new Date() 
            expirydate.setHours(expirydate.getHours()+1)
        

        const newuser = new UserModel({
            username,
            email,
            password:hashedpassword,
            verifyCode:verifyCode,
            verifyCodeExpiry:expirydate,
            isVerified:false,
            isAcceptingMessage:true,
            message:[]
        })

        await newuser.save()
    }

    //send verification email

    const emailresponse = await sendVerificationEmail(
        email,
        username,
        verifyCode,
    )

    if(!emailresponse.succes){
        return Response.json({
            succes:false,
            message: emailresponse.messages
        },{status:500})
    }

    return Response.json({
            succes:true,
            message:"user registered successfully,please verify your email"
        },{status:201})

    } catch (error) {
        console.error("error registering user")

        return Response.json({
            succes:false,
            message:"error registering user"
        },
        {
            status:500,
        }
    )
    }
}