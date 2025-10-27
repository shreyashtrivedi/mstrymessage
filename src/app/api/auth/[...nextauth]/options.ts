import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { signIn } from "next-auth/react";
import { jwt } from "zod";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: "Credentials",
            name:"Credentials",
            credentials: {
            email: { label: "email", type: "text", },
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier},  //identifier aise milega

                        ]
                    })

                    if(!user){
                        throw new Error('no user found with either this email or username')
                    }

                    if(!user.isVerified){
                        throw new Error('please verify your account first ')
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)  // password apko directly milega

                    if(isPasswordCorrect){
                        return user
                    }

                    else{
                        throw new Error('incorrect password')
                    }

                } catch (err:any) {
                    throw new Error(err)
                }

            }
        })
    ],

    callbacks:{

         async jwt({ token, user }) {  // ye user aya h uparvale code se(CredentialsProvider se)
              if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages
                token.username = user.username
              }
        return token
        },



        async session({ session,token }) {   //token ko aur powerful banana hai =>payload ka size badhega, token short rkhoge to baar baar db queries marni pdegi
        if(token){
            session.user._id = token._id
            session.user.isVerified = token.isVerified
            session.user.isAcceptingMessage = token.isAcceptingMessages
            session.user.username = token.username
        }
        return session
    },
       
    },

    pages:{
        signIn: '/sign-in'
    },

    session:{
        strategy: "jwt"
    },

    secret: process.env.NEXTAUTH_SECRET,



}