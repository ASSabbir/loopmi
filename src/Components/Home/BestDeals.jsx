import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaTags } from 'react-icons/fa';

const BestDeals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBestDeals = async () => {
            try {
                // Replace with your actual API endpoint
                // const response = await axios.get('http://localhost:5000/products/deals');
                const response=await axios.get(`https://loopmi-server.vercel.app/new_arrivel_cards`);
                setProducts(response.data.slice(0, 8)); // Limit to 8 products
                setLoading(false);
            } catch (error) {
                console.error('Error fetching best deals:', error);
                setLoading(false);
            }
        };

        fetchBestDeals();
    }, []);

    const calculateDiscount = (originalPrice, currentPrice) => {
        if (!originalPrice || !currentPrice) return 0;
        return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    };

    return (
        <div className="py-16 bg-gray-50 ">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center mb-8">
                    <FaTags className="text-3xl text-yellow-500 mr-3" />
                    <h2 className="text-3xl font-bold text-color6">Best Deals</h2>
                </div>
                
                <p className="text-gray-600 mb-8 max-w-2xl">
                    Incredible savings on quality items! Shop our best promotions and discounted products for maximum value.
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
                                    <Link to={`/product/${product._id}`}>
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
                                    {product.originalPrice && (
                                        <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                                            SAVE {calculateDiscount(product.originalPrice, product.price)}%
                                        </div>
                                    )}
                                    {product.promotion && (
                                        <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                                            {product.promotion}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <Link to={`/product/${product._id}`}>
                                        <h3 className="font-semibold text-lg mb-1 hover:text-color5 transition-colors">
                                            {product.title}
                                        </h3>
                                    </Link>
                                    <div className="flex items-end gap-2">
                                        <span className="text-color5 font-bold text-xl">${product.price}</span>
                                        {product.originalPrice && (
                                            <span className="text-gray-500 line-through text-sm">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <span className="text-gray-600 text-sm">
                                            Offer ends: {new Date(product.promotionEnds).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="text-center mt-10">
                    <Link to="/deals" className="btn btn-outline border-color5 text-color5 hover:bg-color5 hover:text-white hover:border-color5">
                        View All Deals
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BestDeals;