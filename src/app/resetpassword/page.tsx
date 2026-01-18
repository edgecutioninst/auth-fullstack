"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // 1. Grab the token from the URL as soon as the page loads
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    const onSubmit = async () => {
        // Basic Client-side validation
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await axios.post("/api/users/resetpassword", { token, password });
            toast.success("Password reset successful!");
            router.push("/login");
        } catch (error: any) {
            toast.error("Error: Token might be expired.");
            console.log(error);
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

                <h1 className="text-3xl font-extrabold text-white text-center mb-6">Reset Password</h1>

                {token.length > 0 ? (
                    <div className="space-y-6">
                        <div>
                            <label className="text-white text-sm font-semibold mb-1 ml-1 block">New Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/10 border border-white/30 p-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div>
                            <label className="text-white text-sm font-semibold mb-1 ml-1 block">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-white/10 border border-white/30 p-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Confirm new password"
                            />
                        </div>

                        <button
                            onClick={onSubmit}
                            disabled={loading || password.length === 0}
                            className={`w-full py-3 rounded-xl font-bold text-lg text-white transition-all ${loading
                                ? "bg-gray-500/50 cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30"
                                }`}
                        >
                            {loading ? "Resetting..." : "Set New Password"}
                        </button>
                    </div>
                ) : (
                    <div className="text-center text-black-300 bg-red-500/20 p-4 rounded-xl">
                        <h2 className="text-lg font-bold">Error</h2>
                        <p>No token found in URL.</p>
                    </div>
                )}
            </div>
        </div>
    );
}