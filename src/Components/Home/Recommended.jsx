import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRegThumbsUp } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { AuthContext } from '../Root/AuthProvider';

const Recommended = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!user);
        
        const fetchRecommendedProducts = async () => {
            try {
                // If user is logged in, fetch personalized recommendations
                // Otherwise fetch popular products as fallback
                // const endpoint = user 
                //     ? `http://localhost:5000/products/recommended/${user.email}` 
                //     : 'http://localhost:5000/products/popular';
                
                // const response = await axios.get(endpoint);
                const response=await axios.get(`https://loopmi-server.vercel.app/new_arrivel_cards`);
                setProducts(response.data.slice(0, 8)); // Limit to 8 products
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recommended products:', error);
                setLoading(false);
            }
        };

        fetchRecommendedProducts();
    }, [user]);

    return (
        <div className="py-16 bg-base-100">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center mb-8">
                    <FaRegThumbsUp className="text-3xl text-blue-500 mr-3" />
                    <h2 className="text-3xl font-bold text-color6">Recommended For You</h2>
                </div>
                
                <p className="text-gray-600 mb-8 max-w-2xl">
                    {isLoggedIn 
                        ? "Curated just for you based on your browsing history and preferences."
                        : "Popular items you might like. Sign in for personalized recommendations."}
                </p>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <span className="loading loading-spinner loading-lg text-color5"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                                <div className="relative overflow-hidden">
                                    <Link to={`/item/${product._id}`}>
                                        <img 
                                            src={product.photo || 'https://via.placeholder.com/300'}
                                            alt={product.title}
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </Link>
                                    <div className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
                                        {product.isWishlisted ? (
                                            <AiFillHeart className="text-red-500 text-xl cursor-pointer" />
                                        ) : (
                                            <AiOutlineHeart className="text-gray-600 text-xl cursor-pointer hover:text-red-500" />
                                        )}
                                    </div>
                                    {product.matchScore && (
                                        <div className="absolute bottom-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                                            {product.matchScore}% Match
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <Link to={`/item/${product._id}`}>
                                        <h3 className="font-semibold text-lg mb-1 hover:text-color5 transition-colors">
                                            {product.title}
                                        </h3>
                                    </Link>
                                    <div className="flex justify-between items-center">
                                        <span className="text-color5 font-bold">${product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-gray-500 line-through text-sm">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <span className="text-yellow-500">★★★★</span>
                                        <span className="text-yellow-300">★</span>
                                        <span className="text-gray-500 text-sm ml-2">(${product.reviews?.length || 0})</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="text-center mt-10">
                    {!isLoggedIn ? (
                        <Link to="/login" className="btn bg-blue-500 hover:bg-blue-600 text-white border-none">
                            Sign In for Personalized Recommendations
                        </Link>
                    ) : (
                        <Link to="/recommended" className="btn btn-outline border-color5 text-color5 hover:bg-color5 hover:text-white hover:border-color5">
                            View All Recommendations
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recommended;