import 'next-auth'
//ab next-auth k koi bhi already declared module ko redefine kr skte h
declare module 'next-auth'{       //one way to redefine
    interface User{
        _id?: string,
        isVerified?: boolean,
        isAcceptingMessages?:boolean,
        username?:string,

    }

    interface Session{
        user:{
        _id?: string,
        isVerified?: boolean,
        isAcceptingMessages?:boolean,
        username?:string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt'{   //another way to redefine
    interface JWT {
        _id?: string,
        isVerified?: boolean,
        isAcceptingMessages?:boolean,
        username?:string
    }
}