import { connect, connection } from "mongoose"

let mongo_db_url = process.env.MONGODB_URL

if(!mongo_db_url)
{
    throw new Error("Mongodb URL is not found.") 
}

let cached = global.mongoose

if(!cached)
{
   cached = global.mongoose = {conn:null, promise:null}
}

const connectDB =  async () =>{
    if(cached.conn)
    {
        console.log("DB connect From cached");
        return cached.conn   
    }

    if (!cached.promise) {
       cached.promise = connect(mongo_db_url).then((c)=>c.connection)
    }

    try{

        cached.conn = await cached.promise
        console.log("DB connect From promised");

    } 
    catch(error)
    {
        throw error
    }
    return cached.conn

    
}

export default connectDB