import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostDataUsing = () => {
    const [enterDetails, setEnterDetails] = useState({
        name: "",
        email: "",
        address: ""
    });

    const navigate = useNavigate();

    // Background image from Pexels (or you can use a local asset)
    const backgroundImage = "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/students/save", enterDetails);
            navigate("/");
        } catch (error) {
            console.error("Insert failed:", error);
        }
    };

    const handleChange = (e) => {
        setEnterDetails({ ...enterDetails, [e.target.name]: e.target.value });
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content – centered form */}
            <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
                {/* Glass‑morphism Form Card */}
                <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        Add Student Details
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={enterDetails.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg 
                                         text-white placeholder-white/50 focus:outline-none 
                                         focus:ring-2 focus:ring-green-400 focus:border-transparent
                                         transition duration-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={enterDetails.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg 
                                         text-white placeholder-white/50 focus:outline-none 
                                         focus:ring-2 focus:ring-green-400 focus:border-transparent
                                         transition duration-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={enterDetails.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg 
                                         text-white placeholder-white/50 focus:outline-none 
                                         focus:ring-2 focus:ring-green-400 focus:border-transparent
                                         transition duration-200"
                                required
                            />
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="bg-gray-500/80 hover:bg-gray-600 text-white px-4 py-2 
                                         rounded-lg transition duration-200 backdrop-blur-sm
                                         border border-gray-400/30"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-500/80 hover:bg-green-600 text-white px-6 py-2 
                                         rounded-lg transition duration-200 backdrop-blur-sm
                                         border border-green-400/30 shadow-lg"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostDataUsing;