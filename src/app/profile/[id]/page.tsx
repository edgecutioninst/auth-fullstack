import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import Link from "next/link";

export default async function UserProfilePage({ params }: any) {
    const { id } = await params;

    connect();
    const user = await User.findOne({ _id: id });

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
                    <p>Explorer not found.</p>
                    <Link href="/profile" className="text-orange-500 underline mt-4 block">Return to Base</Link>
                </div>
            </div>
        );
    }

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4"
            style={{ backgroundImage: `url('https://images.pexels.com/photos/30766981/pexels-photo-30766981.png')` }}
        >
            <div className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-2xl relative overflow-hidden">

                <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">

                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg mb-6">
                        {user.username.charAt(0).toUpperCase()}
                    </div>

                    <h1 className="text-3xl font-extrabold text-white mb-2">{user.username}</h1>
                    <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-1 mb-8">
                        <p className="text-orange-200 text-sm tracking-wide">VERIFIED EXPLORER</p>
                    </div>

                    <div className="w-full bg-black/20 rounded-xl p-6 border border-white/10 text-left space-y-4">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Database ID</p>
                            <p className="text-white font-mono text-sm break-all">{id}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Email</p>
                            <p className="text-white font-medium">{user.email}</p>
                        </div>
                    </div>

                    <Link
                        href="/profile"
                        className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all flex items-center gap-2 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Dashboard
                    </Link>

                </div>
            </div>
        </div>
    );
}