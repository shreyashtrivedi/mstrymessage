import mongoose from "mongoose";
//db se connection ata h to TS inject krke pata karenge ki db connection k bad jo object arha usme se kya value chahiye aur uska datatype kya h

type ConnectionObject = {
    isConnected?:number    //hobhi skti h nhi bhi to agar return hoti h to number me hi aayegi
}

const connection: ConnectionObject = {} // initially ye empty isiliye kr paye kyoki optional rkha h hmne isconnected ko 

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("already connected to database");
        return
    }


try{
 const db =   await mongoose.connect(process.env.MONGODB_URI || '',{})
connection.isConnected = db.connections[0].readyState
console.log("DB connected succesfully");
} catch(error){
    console.log("db connection failed",error);
    
    process.exit(1)
    }
}

export default dbConnect;