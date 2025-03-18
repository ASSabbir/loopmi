import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

const Shop = () => {
    const [totalData, setTotalData] = useState(0);
    const [activePage, setActivePage] = useState(0);
    const [searchQuery, setSearchQuery] = useState(""); // Search input state

    useEffect(() => {
        axios.get('https://loopmi-server.vercel.app/cart_count')
            .then(res => setTotalData(res.data.count));
    }, []);

    const numberOfPages = Math.ceil(totalData / 8);
    const pages = [...Array(numberOfPages).keys()];

    // Fetch products with search filter
    const { data } = useQuery({
        queryKey: ['all items', activePage, searchQuery],
        queryFn: async () => {
            const res = await axios.get(`https://loopmi-server.vercel.app/cart_pagination?limit=8&skip=${activePage}&search=${searchQuery}`);
            return res.data;
        }
    });

    return (
        <div className="mt-20">
            <section className="text-gray-800 relative overflow-hidden">
                {/* Background Gradient Blur Divs */}
                <div className="absolute inset-0 flex justify-center">
                    <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute right-20 top-1/2 -z-10"></div>
                    <div className='bg-color1 w-full opacity-30'></div>
                    <div className="w-[100px] h-[200px] bg-color3 blur-[50px] rounded-full absolute right-20 top-32 -z-10"></div>
                    <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute left-2 bottom-64 -z-10"></div>
                </div>

                {/* Main Content */}
                <div className="max-w-screen-2xl relative z-10 flex flex-col justify-center items-center p-6 mx-auto sm:py-12 lg:py-12 lg:flex-row lg:justify-center">
                    <div className="text-center md:w-[60%] flex flex-col justify-center items-center">
                        <h1 className="text-2xl font-bold sm:text-5xl">
                            5,000+ products available for purchase
                        </h1>
                        <p className="mt-6 mb-8 md:text-lg sm:mb-12 text-sm">
                            Explore a wide range of recycled products and shop sustainably. <br />
                            Give new life to pre-loved items while supporting a greener future.
                        </p>
                        <div className="relative flex flex-row items-center justify-center">
                            <input
                                type="text"
                                placeholder="Search here"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input w-full rounded-full max-w-2xl px-6 md:h-16 border-[2px] border-zinc-100"
                            />
                            <button className="duration-150 right-2 p-2 md:p-3 text-white text-2xl rounded-full absolute">
                                <CiSearch />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-screen-2xl p-2 my-20 mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 items-center">
                {data?.map((item, index) => (
                    <Link to={`/item/${item._id}`} key={index} className="card glass cursor-pointer">
                        <figure className="h-20 md:h-40">
                            <img src={item.photo} alt={item.title} className="object-cover" />
                        </figure>
                        <div className="md:p-5 p-2">
                            <h2 className="font-semibold text-sm md:text-base">{item.title || "Default Title"}</h2>
                            <div className="flex text-sm md:text-base justify-between mt-3">
                                <h1>by {item.vendorUsername}</h1>
                                <h1 className="font-semibold">${item.price}</h1>
                            </div>
                            <div className="divider"></div>
                            <h1 className="text-sm md:text-base">Category : {item.category}</h1>
                            <div className="mt-2 text-sm md:text-base">
                                <div className="rating rating-xs text-orange-500">
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                    <IoStar />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            <div className="p-6 sm:p-12 bg-gray-50 flex justify-center items-center gap-6">
                <div className="join">
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setActivePage(page)}
                            className={`join-item btn btn-md ${activePage === page && 'bg-color5 text-white'}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
