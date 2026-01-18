"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(false);

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log("Logout error:", error);
            toast.error("Logout failed");
        }
    };

    const getUserDetails = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/users/me");
            console.log("User details:", res.data);
            setData(res.data.user || res.data.data);
        } catch (error: any) {
            toast.error("Failed to fetch details");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4"
            style={{ backgroundImage: `url('https://images.pexels.com/photos/30766981/pexels-photo-30766981.png')` }}
        >
            <div className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden">

                <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-orange-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center">

                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-white mb-2">Profile Dashboard</h1>
                        <p className="text-gray-200">Manage your journey settings</p>
                    </div>

                    <hr className="w-full border-white/20 mb-8" />

                    <div className="w-full bg-black/20 rounded-xl p-6 mb-8 border border-white/10 min-h-[100px] flex items-center justify-center">
                        {/* FIX 2: Check '!data' instead of 'data === null' */}
                        {!data ? (
                            <p className="text-gray-400 italic">Click "Get Details" to load user data</p>
                        ) : (
                            <div className="text-center w-full">
                                <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Current User</p>
                                <h2 className="text-2xl font-bold text-white mb-2">{data.username}</h2>
                                <p className="text-gray-300 mb-4">{data.email}</p>
                                <Link
                                    href={`/profile/${data._id}`}
                                    className="inline-block bg-orange-500/20 text-orange-300 px-4 py-1 rounded-full text-sm hover:bg-orange-500/40 transition-all border border-orange-500/30"
                                >
                                    View ID: {data._id}
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 w-full">
                        <button
                            onClick={getUserDetails}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform active:scale-95"
                        >
                            {loading ? "Loading..." : "Get Details"}
                        </button>

                        <button
                            onClick={logout}
                            className="flex-1 bg-red-500/80 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-red-500/20 transition-all backdrop-blur-sm transform active:scale-95"
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}