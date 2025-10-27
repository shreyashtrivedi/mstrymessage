import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";

import { UsernameValidation } from "@/schemas/signUpSchema";


const usernamequerySchema = z.object({
    username: UsernameValidation
})

export async function GET(request: Request){
    //TODO:USE IN ALL OTHER ROUTES

    // if(request.method !== 'GET'){
    //     return Response.json({
    //         success: false,
    //         message: "only GET method is allowed"
    //     },{status:405})
    // }     

    // ab next me is code ki zaroorat nahi


    await dbConnect();

//localhost:3000/api/check_unique_username?username=shreyash?phone=android

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get("username"),
        } 
        //validate with zod

        const result = usernamequerySchema.safeParse(queryParam)

        console.log(result)

        //jo query bhej rhe hai vo agar format me nhi hai to error dene ke liye=>

        if(!result.success){
            const UserNameErrors = result.error.format().username?._errors || []
            return Response.json({
            success: false,
            message: UserNameErrors?.length>0 
            ? UserNameErrors.join(',') 
            : 'invalid query parameters',
            
        },{status:400})
        }

        const {username} = result.data;

        const existingverifieduser = await UserModel.findOne({username,isVerified:true})

        if(existingverifieduser){
            return Response.json({
            success: true,
            message:"username is already taken",
        },{status:201})
        }

        return Response.json({
            success: true,
            message:"username is available",
        },{status:201})

        
    } catch (error) {
        console.error("Error checking username uniqueness:", error);
        return Response.json({
            success: false,
            message: "error checking username uniqueness",
            
        },{status:500})
    }
}