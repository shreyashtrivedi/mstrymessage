import mongoose, {Schema,Document} from "mongoose"

export interface Message extends Document{
    content: "String";
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    username: string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    message: Message[]          //har message ka apne aap me alag document bn rha hai par yaha bhi rkh rhe hum
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type:String,
        required:[true,"Username is required"],
        trim: true,    //kisi ne spaces de diye ho to use trim kr denge
        unique:true

    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match: [/.+\@.+\..+/, "please use a valid email mc"]
    },

    password:{
        type:String,
        required:[true,"Password is required"],
        
    },

    verifyCode:{
        type:String,
        required:[true,"Verify Code is required"],
    },

    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify Code Expiry is required"],
    },

    isVerified:{
        type:Boolean,
        default:false,
    },

    isAcceptingMessage:{
        type:Boolean,
        default:true,
    },

    message:[MessageSchema]
})

    //export kaise kiya jaye???
    //nextjs ko nahi pta ki app first time bootup hori ya pehle bhi ho chuki hai 
    //so in next statement lhs of|| is agar bana ho pehle se and rhs is agar nhi bna to aisa bana do
    const UserModel = ( mongoose.models.User as mongoose.Model<User>  ) || 
    mongoose.model<User>("User",UserSchema)

export default UserModel;