import connectDB from "@/config/db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    try {
        const {name, email, password} = await request.json()
        await connectDB()

        let existuser = await User.findOne({email})
        if(existuser)
        {
            return NextResponse.json(
                {message:`${email} this email of user already exit!`},
                {status:400}
            )
        }

        if(password.length<6)
        {
            return NextResponse.json(
                {message:"Password must be atleast 6 characters!"},
                {status:400}
            )
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name, 
            email,
            password:hashedPassword
        })

        return NextResponse.json(
            {message:"user created successfully"},
            {status:201}
        )
    }
    catch(error)
    {
        return NextResponse.json(
            {message : `internal server error --> ${error}`},
            {status:400}
        )
        throw error
        console.log("register Router",error)
    }
}

export async function DELETE(request:NextRequest) 
{
    try {
        await connectDB()
        const {email} = await request.json()
        let existuser = await User.findOne({email})
        if(!existuser)
        {
            return NextResponse.json(
                {message:`${email} this email of user not exit!`},
                {status:400}
            )
        }
        await User.deleteOne({email})
        return NextResponse.json(
            {message:"user deleted successfully"},
            {status:200}
        )
    }
    catch(error)
    {
        return NextResponse.json(
            {message : `internal server error --> ${error}`},
            {status:400}
        )
    }
}