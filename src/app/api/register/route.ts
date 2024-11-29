import { connectMongoDB } from "@/app/libs/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: { json: () => PromiseLike<{ email: any; username: any; password: any; confirmPassword: any; }> | { email: any; username: any; password: any; confirmPassword: any; }; }) {
    try {
        const { email, username, password, confirmPassword } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create ({ email, username, password:hashedPassword, confirmPassword:hashedPassword });

        return NextResponse.json({message: "User registered." }, {status: 201});
        } catch (error) {
        return NextResponse.json(
            {message: "An error occured during registration."}, {status: 500}
        );

        }
    }
