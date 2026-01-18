import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody;

        //check if user already exists
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 });
        }

        //compare password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 });
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET! as string, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user
        });

        response.cookies.set('token', token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}