import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const About = () => {

    const User = useSelector((state) => state.user)
    const nevigate = useNavigate();
    const HandleAbout = () => {
        nevigate("/Home")
    }

    return (
        <div className="bg-base-100 overflow-y-scroll text-white min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#1f1f2e] to-[#2a2a3f] px-6 py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">
                    Welcome to <span className="text-indigo-400">Dev-Circle</span>
                </h1>
                <p className="text-xl max-w-2xl mx-auto mb-8">
                    The social hub where developers grow, connect, and build the future — together.
                </p>
                <p className="text-indigo-300 italic text-lg mb-6">
                    “The community you live, the standard they maintain —
                    follow them and become like them, naturally.”
                </p>

                <button onClick={HandleAbout} className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 rounded text-lg font-semibold transition">
                    Join Dev-Circle
                </button>

            </section>

            {/* Features */}
            <section className="py-16 px-6 lg:px-24">
                <h2 className="text-3xl font-bold text-center mb-8">What You Can Do Here</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 bg-[#212134] rounded-lg shadow-lg hover:shadow-indigo-500 transition">
                        <h3 className="text-2xl font-semibold mb-2">💬 Share Ideas</h3>
                        <p>Post your thoughts, insights, and creative concepts with the world.</p>
                    </div>
                    <div className="p-6 bg-[#212134] rounded-lg shadow-lg hover:shadow-indigo-500 transition">
                        <h3 className="text-2xl font-semibold mb-2">🤝 Meet Seniors</h3>
                        <p>Connect with experienced developers for guidance and mentorship.</p>
                    </div>
                    <div className="p-6 bg-[#212134] rounded-lg shadow-lg hover:shadow-indigo-500 transition">
                        <h3 className="text-2xl font-semibold mb-2">📚 Learn Together</h3>
                        <p>Collaborate on projects, learn new skills and enhance your craft.</p>
                    </div>
                    <div className="p-6 bg-[#212134] rounded-lg shadow-lg hover:shadow-indigo-500 transition">
                        <h3 className="text-2xl font-semibold mb-2">🌐 Seek Opportunities</h3>
                        <p>Find internships, job openings, and real work opportunities.</p>
                    </div>
                    <div className="p-6 bg-[#212134] rounded-lg shadow-lg hover:shadow-indigo-500 transition">
                        <h3 className="text-2xl font-semibold mb-2">👥 Make Friends</h3>
                        <p>Build friendships with like-minded developers across the globe.</p>
                    </div>
                    <div className="p-6 bg-[#212134] rounded-lg shadow-lg hover:shadow-indigo-500 transition">
                        <h3 className="text-2xl font-semibold mb-2">🚀 Grow Together</h3>
                        <p>Push each other forward — improve, inspire, and innovate.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action Banner */}
            <section className="bg-indigo-600 py-10 text-center px-6">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Become a Part of Something Bigger?
                </h2>
                <Link
                    to={User ? "" : "/"}
                    className="mt-3 inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded hover:bg-gray-200 transition"
                >
                    Start Your Journey
                </Link>
            </section>

            {/* Footer */}
            <footer className="bg-[#1b1b2b] text-center py-6 mt-10">
                <p className="text-sm">
                    Developed with ❤️ for the Dev-Circle Community
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    © {new Date().getFullYear()} Dev-Circle. All Rights Reserved.
                </p>
            </footer>
        </div>
    );
};
