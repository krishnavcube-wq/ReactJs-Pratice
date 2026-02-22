import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const ListOfData = () => {
    const [details, setDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedName, setSelectedName] = useState("");

    // Carousel state
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef(null);

    const heroImages = [
        "https://images.pexels.com/photos/6344238/pexels-photo-6344238.jpeg", // mountains
        "https://images.pexels.com/photos/8086374/pexels-photo-8086374.jpeg", // waterfall
        "https://images.pexels.com/photos/3747499/pexels-photo-3747499.jpeg",   // flower
    ];

    // Background image for the whole page
    const backgroundImageUrl = "https://images.pexels.com/photos/7972352/pexels-photo-7972352.jpeg"; // camera

    const navigate = useNavigate();

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8080/students");
                const data = await res.json();
                setDetails(data);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);

    // Delete Function
    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:8080/students/${selectedId}`, {
                method: "DELETE",
            });

            // Remove from UI
            setDetails(details.filter((user) => user.id !== selectedId));

            setShowModal(false);
            setSelectedId(null);
            setSelectedName("");
        } catch (error) {
            console.log("Delete error:", error);
        }
    };

    // Carousel navigation
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };

    // Auto‑play logic
    const startAutoPlay = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
    };

    useEffect(() => {
        if (!isHovered) {
            startAutoPlay();
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isHovered]);

    // Handlers that restart the timer after manual interaction
    const handlePrev = () => {
        prevSlide();
        if (!isHovered) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            startAutoPlay();
        }
    };

    const handleNext = () => {
        nextSlide();
        if (!isHovered) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            startAutoPlay();
        }
    };

    const handleDotClick = (index) => {
        setCurrentSlide(index);
        if (!isHovered) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            startAutoPlay();
        }
    };

    // Open delete modal with user name
    const openDeleteModal = (id, name) => {
        setSelectedId(id);
        setSelectedName(name);
        setShowModal(true);
    };

    return (
        // Outer container with background image
        <div className="relative min-h-screen bg-cover bg-center bg-fixed"
             style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content - relative and above overlay */}
            <div className="relative z-10 container mx-auto p-6">
                {/* Hero Carousel Section */}
                <div
                    className="relative w-full h-64 md:h-96 mb-8 overflow-hidden rounded-2xl shadow-xl"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Images */}
                    <div
                        className="flex transition-transform duration-500 ease-out h-full"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {heroImages.map((img, index) => (
                            <div
                                key={index}
                                className="w-full h-full flex-shrink-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${img})` }}
                            >
                                {/* Optional overlay text */}
                                <div className="w-full h-full flex items-center justify-center bg-black/30">
                                    <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
                                        Welcome to Student Portal
                                    </h1>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition"
                    >
                        ❮
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition"
                    >
                        ❯
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-3 h-3 rounded-full transition ${
                                    currentSlide === index
                                        ? "bg-white scale-125"
                                        : "bg-white/50 hover:bg-white/80"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <h2 className="text-3xl font-bold mb-6 text-white">User List</h2>

                {/* Add Button */}
                <Link
                    to="/insert"
                    className="bg-green-500 hover:bg-green-700 text-white px-5 py-2 rounded-lg inline-block mb-6 transition shadow-md"
                >
                    ➕ Add Data
                </Link>

                {/* Delete Confirmation Modal - Fixed Center with Backdrop */}
                {showModal && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            onClick={() => {
                                setShowModal(false);
                                setSelectedId(null);
                                setSelectedName("");
                            }}
                        ></div>

                        {/* Modal */}
                        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-96 p-6 animate-fadeIn">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                Confirm Delete
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold text-red-600">
                                    {selectedName}
                                </span>
                                ? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedId(null);
                                        setSelectedName("");
                                    }}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg transition shadow-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Table Container */}
                <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-xl overflow-hidden">
                    <div className="max-h-[400px] overflow-y-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        Address
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {details.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={`${
                                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-indigo-50 transition duration-150`}
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-700 font-mono">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.address}
                                        </td>
                                        <td className="px-6 py-4 text-sm space-x-3">
                                            <button
                                                onClick={() =>
                                                    navigate("/edit/" + user.id)
                                                }
                                                className="inline-flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg transition font-medium"
                                            >
                                                ✏️ Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    openDeleteModal(user.id, user.name)
                                                }
                                                className="inline-flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg transition font-medium"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListOfData;