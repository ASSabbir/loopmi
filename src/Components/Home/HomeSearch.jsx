import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiFilter, FiX } from 'react-icons/fi';
import { BsArrowRight } from 'react-icons/bs';
import axios from 'axios';
import { AuthContext } from '../Root/AuthProvider';

const HomeSearch = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [searchParams, setSearchParams] = useState({
        keyword: '',
        location: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        condition: ''
    });
    
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [popularSearches, setPopularSearches] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchRecentSearches = async () => {
            if (!user) return;
            
            try {
                const response = await axios.get(`http://localhost:5000/user/recent-searches/${user.email}`);
                setRecentSearches(response.data.slice(0, 5)); // Get last 5 searches
            } catch (error) {
                console.error('Error fetching recent searches:', error);
            }
        };

        const fetchPopularSearches = async () => {
            try {
                const response = await axios.get('http://localhost:5000/popular-searches');
                setPopularSearches(response.data.slice(0, 5)); // Get top 5 popular searches
            } catch (error) {
                console.error('Error fetching popular searches:', error);
            }
        };

        fetchCategories();
        fetchRecentSearches();
        fetchPopularSearches();
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value
        });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Filter out empty values
        const queryParams = Object.entries(searchParams)
            .filter(([_, value]) => value !== '')
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        // Save search to user history if logged in
        if (user && searchParams.keyword) {
            try {
                await axios.post('http://localhost:5000/user/save-search', {
                    userId: user.uid,
                    email: user.email,
                    searchParams: searchParams,
                    timestamp: new Date().toISOString()
                });
            } catch (error) {
                console.error('Error saving search:', error);
            }
        }

        setLoading(false);
        navigate(`/search?${queryParams}`);
    };

    const handleQuickSearch = (search) => {
        if (typeof search === 'string') {
            // If it's a popular search (just a string)
            setSearchParams({
                ...searchParams,
                keyword: search
            });
            navigate(`/search?keyword=${encodeURIComponent(search)}`);
        } else {
            // If it's a recent search (object with search params)
            const queryParams = Object.entries(search)
                .filter(([_, value]) => value !== '')
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');
            
            setSearchParams(search);
            navigate(`/search?${queryParams}`);
        }
    };

    const clearSearch = () => {
        setSearchParams({
            keyword: '',
            location: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            condition: ''
        });
    };

    return (
        <div className="py-8 bg-base-100 ">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto ">
                    <form onSubmit={handleSearch} className="bg-color5/20 rounded-lg shadow-lg p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-grow relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiSearch className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="keyword"
                                    value={searchParams.keyword}
                                    onChange={handleInputChange}
                                    placeholder="What are you looking for?"
                                    className="input input-bordered w-full pl-10 focus:border-color5"
                                />
                                {searchParams.keyword && (
                                    <button 
                                        type="button" 
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setSearchParams({...searchParams, keyword: ''})}
                                    >
                                        <FiX className="text-gray-400 hover:text-gray-600" />
                                    </button>
                                )}
                            </div>
                            
                            <div className="relative md:w-1/3">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMapPin className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="location"
                                    value={searchParams.location}
                                    onChange={handleInputChange}
                                    placeholder="Location"
                                    className="input input-bordered w-full pl-10 focus:border-color5"
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="btn bg-color5 hover:bg-color4 text-white border-none"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner"></span> : <FiSearch />}
                                Search
                            </button>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                            <button
                                type="button"
                                className="text-color5 text-sm flex items-center hover:underline focus:outline-none"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                            >
                                <FiFilter className="mr-1" />
                                {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
                            </button>
                            
                            {(searchParams.category || searchParams.minPrice || searchParams.maxPrice || searchParams.condition) && (
                                <button
                                    type="button"
                                    className="text-gray-500 text-sm hover:underline"
                                    onClick={clearSearch}
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                        
                        {showAdvanced && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-600">Category</span>
                                    </label>
                                    <select
                                        name="category"
                                        value={searchParams.category}
                                        onChange={handleInputChange}
                                        className="select select-bordered w-full focus:border-color5"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map(category => (
                                            <option key={category._id} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="flex gap-2">
                                    <div className="form-control flex-1">
                                        <label className="label">
                                            <span className="label-text text-gray-600">Min Price</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="minPrice"
                                            value={searchParams.minPrice}
                                            onChange={handleInputChange}
                                            placeholder="From"
                                            className="input input-bordered w-full focus:border-color5"
                                        />
                                    </div>
                                    
                                    <div className="form-control flex-1">
                                        <label className="label">
                                            <span className="label-text text-gray-600">Max Price</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="maxPrice"
                                            value={searchParams.maxPrice}
                                            onChange={handleInputChange}
                                            placeholder="To"
                                            className="input input-bordered w-full focus:border-color5"
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-600">Condition</span>
                                    </label>
                                    <select
                                        name="condition"
                                        value={searchParams.condition}
                                        onChange={handleInputChange}
                                        className="select select-bordered w-full focus:border-color5"
                                    >
                                        <option value="">Any Condition</option>
                                        <option value="New">New</option>
                                        <option value="Like New">Like New</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Refurbished">Refurbished</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </form>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {recentSearches.length > 0 && (
                            <div className="w-full md:w-auto">
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Recent Searches:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {recentSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickSearch(search.searchParams)}
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 flex items-center"
                                        >
                                            {search.searchParams.keyword}
                                            <BsArrowRight className="ml-1 text-xs" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {popularSearches.length > 0 && (
                            <div className="w-full md:w-auto mt-3 md:mt-0">
                                <h3 className="text-sm font-medium text-gray-600 mb-2">Popular Searches:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {popularSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickSearch(search.term)}
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                                        >
                                            {search.term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSearch;