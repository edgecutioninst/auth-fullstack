import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-6 text-center"
      style={{ backgroundImage: `url('https://images.pexels.com/photos/30766981/pexels-photo-30766981.png')` }}
    >
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg border border-white/20 p-12 rounded-3xl shadow-2xl hover:shadow-orange-500/20 transition-shadow duration-500">

        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-200 mb-6 drop-shadow-sm">
          AUTHENTICATION SYSTEM
        </h1>

        <p className="text-xl text-gray-200 mb-8 font-light leading-relaxed">
          A complete Full-Stack Authentication system built with <br />
          <span className="font-bold text-orange-300">Next.js</span>, <span className="font-bold text-green-300">MongoDB</span>, and <span className="font-bold text-sky-300">Tailwind CSS</span>.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">

          <Link href="/login">
            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transform hover:-translate-y-1 transition-all duration-300 text-lg w-full sm:w-auto">
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-xl shadow-lg backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-300 text-lg w-full sm:w-auto">
              Sign Up
            </button>
          </Link>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-neutral-800 text-sm">
            Ready to explore? <Link href="/profile" className="text-orange-300 hover:underline">Go to Profile</Link>
          </p>
        </div>

      </div>
    </div>
  );
}