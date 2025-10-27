import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request:Request){
    await dbConnect();
    
    const session = await getServerSession(authOptions)
    const user:User = session?.user 

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"not authenticated",
        },{status:401})
    }

    const userid = user._id
    const {acceptmessages} = await request.json();


    try {
        const updateduser = await UserModel.findByIdAndUpdate(
            userid,
            {isAcceptingMessage:acceptmessages},
            {new:true},          // ek aur parameter de diya taki updated value mile;
        )

        if(!updateduser){
            return Response.json({
            success:false,
            message:"failed to update user statuts to accept messages",
        },{status:401})
        }

        return Response.json({
            success:true,
            message:"Message Acceptance status updated successfully",
            updateduser
        },{status:200})


        
    } catch (error) {
        console.log("failed to update user statuts to accept messages")
        return Response.json({
            success:false,
            message:"failed to update user statuts to accept messages",
        },{status:500})
    }



}


export async function GET(request:Request){
    await dbConnect();
    
    const session = await getServerSession(authOptions)
    const user:User = session?.user 

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"not authenticated",
        },{status:401})
    }

    const userid = user._id

    try {
        const founduser = await UserModel.findById(userid)

    if(!founduser){
            return Response.json({
            success:false,
            message:"user not found",
        },{status:404})
        }

        return Response.json({
            success:true,
            isAcceptingMessages: founduser.isAcceptingMessage
        },{status:200})
        
    } catch (error) {
        console.log("error in getting message acceptance status")
        return Response.json({
            success:false,
            message:"error in getting message acceptance status",
        },{status:500})
    }
    
}