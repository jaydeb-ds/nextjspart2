import mongoose from "mongoose";

interface Iuser{
    _id?:mongoose.Types.ObjectId, //mongodb default
    name ?: string,
    image? : string,
    email : string,
    password : string,
    createdAt : Date, //mongodb default
    updatedAt : Date //mongodb default
}

const userSchema = new mongoose.Schema<Iuser>({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    image : {
        type : String,
    }
},{timestamps:true})

// const User = mongoose.model('User',userSchema) <-- this line will show error in nextjs

const User = mongoose.models.User || mongoose.model('User',userSchema);

export default User