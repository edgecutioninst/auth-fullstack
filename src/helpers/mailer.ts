import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //create hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })

        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        const mailOptions = {
            from: "harsh@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
                <h2 style="color: #333;">${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</h2>
                <p style="color: #555; font-size: 16px; line-height: 1.5;">
                    Thank you for joining us! Please click the button below to ${emailType === "VERIFY" ? "confirm your email address" : "reset your account password"}. 
                    This link will expire in 1 hour.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}" 
                    style="background-color: #f97316; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">
                    ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
                    </a>
                </div>
                <p style="color: #888; font-size: 14px;">
                    If the button doesn't work, copy and paste this link into your browser: <br>
                    <span style="color: #f97316;">${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}</span>
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;">
                <p style="font-size: 12px; color: #aaa;">If you did not request this email, please ignore it.</p>
            </div>
    `
        };

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}