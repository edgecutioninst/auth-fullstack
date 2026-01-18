"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("/api/users/forgotpassword", { email });
            toast.success("Reset link sent to your email!");
            setEmail("");
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-6"
            style={{ backgroundImage: `url('https://images.pexels.com/photos/30766981/pexels-photo-30766981.png')` }}
        >
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl">

                <h1 className="text-3xl font-extrabold text-white text-center mb-2">
                    Forgot Password?
                </h1>
                <p className="text-gray-200 text-center mb-8 font-medium">
                    Don't worry, we'll send you a rescue link.
                </p>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-white text-sm font-semibold mb-1 ml-1 block">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full bg-white/10 border border-white/30 p-3 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !email}
                        className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${loading
                            ? "bg-gray-500/50 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30"
                            } text-white`}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/login" className="text-orange-300 hover:text-orange-400 text-sm font-medium transition-colors">
                        ← Back to Login
                    </Link>
                </div>

            </div>
        </div>
    );
}