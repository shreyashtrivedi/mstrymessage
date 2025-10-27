import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";


// sare messages ek sath leke serve krne h par ye nhi kr payenge kyuki jo interface humne banaya
//hai usme messages array hai apne aap me ek document type ke
//chaho to poora array dump kar skte ho par utna optimised nhi hai vo
//so aggregation pipeline 

export async function Get(reqest:Request){
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user:User = session?.user 

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"not authenticated",
        },{status:401})
    }

    // const userid = user._id

    // user ko string me convert kiya tha humne to aggregation me 
    // users ko find krte vakt issues aa jate hai 

    const userId = new mongoose.Types.ObjectId(user._id)
    try {
        const user = await  UserModel.aggregate([
            {$match: {id:userId}},
            { $unwind: 'messages'},
            {$sort: {'messages.createdAt':-1}},
            {$group:{_id:'$_id', messages:{$push:'$messages'}}}

        ])

        if(!user || user.length === 0){
            return Response.json({
                success:false,
                message:"user not found"
            },{status:404})
        }

        return Response.json({
                success:true,
                messages: user[0].messages
            },{status:200})


        
    } catch (error) {
        
    }


}