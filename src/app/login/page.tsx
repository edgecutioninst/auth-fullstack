"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div
            className="flex items-center justify-end min-h-screen bg-cover bg-center bg-no-repeat px-6 md:px-24"
            style={{ backgroundImage: `url('https://images.pexels.com/photos/30766981/pexels-photo-30766981.png')` }}
        >
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl">
                <h1 className="text-4xl font-extrabold text-white text-center mb-2">
                    {loading ? "Processing..." : "Welcome Back"}
                </h1>
                <p className="text-gray-200 text-center mb-8 font-medium">Resume your journey</p>

                <hr className="border-white/20 mb-8" />

                <div className="space-y-5">

                    <div className="flex flex-col">
                        <label className="text-white text-sm font-semibold mb-1 ml-1" htmlFor="email">Email</label>
                        <input
                            className="bg-white/10 border border-white/30 p-3 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                            type="text"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="yourname@email.com"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white text-sm font-semibold mb-1 ml-1" htmlFor="password">Password</label>
                        <input
                            className="bg-white/10 border border-white/30 p-3 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="••••••••"
                        />
                        <div className="flex justify-end mt-2">
                            <Link
                                href="/forgotpassword"
                                className="text-sm text-yellow-200 hover:text-yellow-100 transition-colors font-medium"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <button
                        onClick={onLogin}
                        disabled={buttonDisabled || loading}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 mt-4 ${buttonDisabled || loading
                            ? "bg-gray-500/50 text-gray-300 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30"
                            }`}
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-neutral-800 font-medium">
                        New here?{" "}
                        <Link href="/signup" className="text-orange-600 font-bold hover:underline hover:text-orange-700">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}