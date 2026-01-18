import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({ message: "User with this email does not exist" }, { status: 404 });
        }

        await sendEmail({ email, emailType: "RESET", userId: user._id });

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

    } catch (error: any) {
        throw NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}