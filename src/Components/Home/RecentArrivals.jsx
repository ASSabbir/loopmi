import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdNewReleases } from 'react-icons/md';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const RecentArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                // Replace with your actual API endpoint
                // const response = await axios.get('http://localhost:5000/products/recent');
                const response=await axios.get(`https://loopmi-server.vercel.app/new_arrivel_cards`);
                setProducts(response.data.slice(0, 8)); // Limit to 8 products
                setLoading(false);
            } catch (error) {
                console.error('Error fetching new arrivals:', error);
                setLoading(false);
            }
        };

        fetchNewArrivals();
    }, []);

    return (
        <div className="py-16 bg-gray-50 ">
            <div className="container mx-auto px-4 max-w-7xl ">
                <div className="flex items-center mb-8">
                    <MdNewReleases className="text-3xl text-color5 mr-3" />
                    <h2 className="text-3xl font-bold text-color6">New Arrivals</h2>
                </div>
                
                <p className="text-gray-600 mb-8 max-w-2xl">
                    Fresh finds added daily! Explore our newest listings featuring recently added sustainable and pre-loved items.
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
                                    <div className="absolute top-3 left-3 bg-color5 text-white px-2 py-1 rounded-md text-xs font-semibold">
                                        NEW
                                    </div>
                                </div>
                                <div className="p-4">
                                    <Link to={`/product/${product._id}`}>
                                        <h3 className="font-semibold text-lg mb-1 hover:text-color5 transition-colors">
                                            {product.title}
                                        </h3>
                                    </Link>
                                    <div className="flex justify-between items-center">
                                        <span className="text-color5 font-bold">${product.price}</span>
                                        <span className="text-gray-500 text-sm">Listed {new Date(product?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                    </div>
                                    <div className="mt-3">
                                        <span className="text-sm text-gray-600">
                                            {product.condition} {'>'} {product.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="text-center mt-10">
                    <Link to="/new-arrivals" className="btn btn-outline border-color5 text-color5 hover:bg-color5 hover:text-white hover:border-color5">
                        View All New Arrivals
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecentArrivals;