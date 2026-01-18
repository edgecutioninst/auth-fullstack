"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
            setError(false);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || '');
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4"
            style={{ backgroundImage: `url('https://images.pexels.com/photos/30766981/pexels-photo-30766981.png')` }}
        >
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl text-center">

                <h1 className="text-3xl font-extrabold text-white mb-6">
                    Verify Account
                </h1>

                {!verified && !error && (
                    <div className="text-gray-200">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <p>{token ? "Verifying your magic link..." : "Looking for token..."}</p>
                    </div>
                )}

                {verified && (
                    <div className="animate-pulse">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                            <span className="text-3xl text-white">✓</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Verified!</h2>
                        <p className="text-gray-200 mb-6">Your email has been confirmed.</p>

                        <Link
                            href="/login"
                            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-orange-500/20"
                        >
                            Login Now
                        </Link>
                    </div>
                )}

                {error && (
                    <div>
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/30">
                            <span className="text-3xl text-white">✕</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
                        <p className="text-red-200 bg-red-500/20 p-3 rounded-lg text-sm mb-4">
                            Invalid or expired token.
                        </p>
                        <Link href="/signup" className="text-orange-400 hover:underline text-sm">
                            Back to Signup
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}