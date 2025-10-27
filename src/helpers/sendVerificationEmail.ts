import {resend} from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import {APIresponse}  from "@/types/APIresponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifycode:string,

): Promise<APIresponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystrry Message Verification Code ',
            react: VerificationEmail({username,otp:verifycode}),

        });
        return{
            succes:true, messages: "verification email sent successfully"
        }
        
    } catch (emailerror) {
        console.error("error sending verification email",
            emailerror)

        return{
            succes:false,
            messages:"failed to send verification email"
        }
    }
}