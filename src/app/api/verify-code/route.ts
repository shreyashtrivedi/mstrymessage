import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {date, z} from "zod";

import { UsernameValidation } from "@/schemas/signUpSchema";


export async function POST(request:Request){
    await dbConnect();

    try {
        const {username,code} = await request.json();
        const decodedusername = decodeURIComponent(username)

        const user = await UserModel.findOne({username:decodedusername})
        if(!user){
            return Response.json({
            success: false,
            message: "user not found",
            
        },{status:500})
        }

        const iscodevalid = user.verifyCode === code
        const iscodenotexpired  = new Date(user.verifyCodeExpiry) > new Date()

        if(iscodevalid && iscodenotexpired){
            user.isVerified = true;
            await user.save();

            return Response.json({
            success: true,
            message: "account verified successfully",
            
        },{status:200})
        }

        else if(!iscodenotexpired){
            return Response.json({
            success: false,
            message: "verification code has expired,please signup again to get a new code",
            
        },{status:400})
        }

        else{
            return Response.json({
            success: false,
            message: "verification code is incorrect",
            
        },{status:400})
        }


        
    } catch (error) {
        console.error("error verifying user",error);
        return Response.json({
            success: false,
            message: "error verifying user",
            
        },{status:500})
        
    }
}