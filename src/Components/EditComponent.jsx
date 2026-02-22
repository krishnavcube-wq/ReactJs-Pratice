import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [editValues, setEditValues] = useState({
        name: "",
        email: "",
        address: ""
    });

    // Background image (you can replace with your own)
    const backgroundImage = "https://images.pexels.com/photos/31039052/pexels-photo-31039052.jpeg";

    useEffect(() => {
        const getDetails = async () => {
            try {
                const res = await axios.get("http://localhost:8080/students/" + id);
                setEditValues(res.data);
            } catch (error) {
                console.error("Error fetching student:", error);
            }
        };
        getDetails();
    }, [id]);

    const handleChange = (e) => {
        setEditValues({ ...editValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8080/students/edit/" + id, editValues);
            navigate("/");
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Centered form */}
            <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
                {/* Glass‑morphism Card */}
                <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        Edit Student
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={editValues.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg 
                                         text-white placeholder-white/50 focus:outline-none 
                                         focus:ring-2 focus:ring-blue-400 focus:border-transparent
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
                                value={editValues.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg 
                                         text-white placeholder-white/50 focus:outline-none 
                                         focus:ring-2 focus:ring-blue-400 focus:border-transparent
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
                                value={editValues.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg 
                                         text-white placeholder-white/50 focus:outline-none 
                                         focus:ring-2 focus:ring-blue-400 focus:border-transparent
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
                                className="bg-blue-500/80 hover:bg-blue-600 text-white px-6 py-2 
                                         rounded-lg transition duration-200 backdrop-blur-sm
                                         border border-blue-400/30 shadow-lg"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditComponent;