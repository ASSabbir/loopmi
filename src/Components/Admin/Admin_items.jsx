import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Admin_items = () => {
    
    const [totalData, setTotalData] = useState(0)
    const [activePage, setActivePage] = useState(0)
    useEffect(() => {
        axios.get('https://loopmi-server.vercel.app/cart_count')
            .then(res => setTotalData(res.data.count))
    },[])
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    const numberOfPages = Math.ceil(totalData / 8)
    const pages = [...Array(numberOfPages).keys()]
    console.log(pages)
    const { data, refetch,isLoading } = useQuery({
        queryKey: [activePage],
        queryFn: async () => {
            const res = await axios.get(`https://loopmi-server.vercel.app/cart_pagination?limit=8&skip=${activePage}`)
            return res.data
        }
    })
    if(isLoading){
        return <div className='flex items-center justify-center w-full pt-2 h-screen'>
        <span className="loading loading-bars loading-lg"></span>
    </div>}
    
    const handelDelete = async (id) => {
        const { value: confirmation } = await Swal.fire({
            title: 'Type "confirm" to proceed',
            input: 'text',
            inputPlaceholder: 'Type "confirm"',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                }
                if (value.toLowerCase() !== 'confirm') {
                    return 'You must type "confirm"!';
                }
            },
            customClass: {
                popup: 'bg-white text-black border-2 border-gray-300',
                title: 'text-2xl font-semibold mb-4',
                input: 'p-2 border border-gray-400 rounded-md',
                confirmButton: 'bg-color5 text-white p-2 rounded-md hover:bg-color2',
                cancelButton: 'bg-red-500 text-white p-2 rounded-md hover:bg-red-600',
            }
        });

        if (confirmation && confirmation.toLowerCase() === 'confirm') {
            axios.delete(`https://loopmi-server.vercel.app/admin_item_delete/${id}`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.acknowledged == true) {
                        Swal.fire({
                            title: "Done!",
                            text: "This item is Delete",
                            icon: "success"
                        });
                        refetch()
                    }
                    else {
            
                        Toast.fire({
                            icon: "error",
                            title: "Try Again"
                        });
                    }
                })

        } 
    }
    return (
        <div className="mt-20">
            <section className="text-gray-800   relative overflow-hidden">
                {/* Background Gradient Blur Divs */}
                <div className="absolute inset-0 flex justify-center">
                    <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute right-20 top-1/2 -z-10"></div>
                    <div className='bg-color1  w-full opacity-30'></div>
                    <div className="w-[100px] h-[200px] bg-color3 blur-[50px] rounded-full absolute right-20 top-32 -z-10"></div>
                    <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute left-2
                     bottom-64 -z-10"></div>
                </div>

                {/* Main Content */}
                <div className="max-w-screen-2xl relative z-10 flex flex-col  justify-center items-center p-6 mx-auto sm:py-12 lg:py-12 lg:flex-row lg:justify-center">
                    <div className="text-center md:w-[60%] flex flex-col justify-center items-center">
                        <h1 className="text-2xl font-bold sm:text-5xl">
                            {totalData} products available for purchase
                        </h1>
                        <p className="mt-6 mb-8 md:text-lg sm:mb-12 text-sm  ">
                        The admin has the authority to manage all cards on this page, including the ability to delete any card when necessary. This ensures smooth content moderation and efficient platform management.
                        </p>
                        
                    </div>

                </div>
            </section>
            <div>
                <div className="max-w-screen-2xl p-2 my-20 mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 items-center  self-center">
                    {data?.map((item, index) => (
                        <div
                            key={index}
                            className="card  glass w- ">
                            <figure className='h-20 md:h-40'>
                                <img
                                    src={item.photo}
                                    alt={item.title}
                                    className='object-cover '
                                />
                            </figure>
                            <div className="md:p-5 p-2">
                                <h2 className="font-semibold text-sm md:text-base  md:font-bold  font-Open_Sans">{item.title || "Default Title"}</h2>
                                <div className='flex text-sm md:text-base justify-between mt-3'>
                                    <h1>by {item.vendorUsername}</h1>
                                    <h1 className='font-semibold'>${item.price}</h1>

                                </div>
                                <div className="divider"></div>
                                <h1 className="text-sm md:text-base">Category : {item.category}</h1>
                                <div className='mt-2 text-sm md:text-base'>
                                    <div className="rating rating-xs text-orange-500">
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                        <IoStar />
                                    </div>

                                </div>
                            </div>
                            <div className="w-full flex justify-between p-5">
                                <Link to={`/item/${item._id}`}>
                                    <button className="bg-color5 text-white rounded-md px-2 p-1 text-sm ">Details</button></Link>

                                <button onClick={() => handelDelete(item._id)} className="bg-red-500 text-white rounded-md px-2 p-1 text-sm ">Delete</button>
                            </div>

                        </div>
                    ))}

                </div>
                <div className="p-6 sm:p-12 bg-gray-50 flex justify-center items-center gap-6">
                    <div className="join">
                        {
                            pages.map((page) => (
                                <button key={page} onClick={() => setActivePage(page)} className={`join-item btn btn-md ${activePage === page && 'bg-color5 text-white'}`}>{page + 1}</button>
                            ))
                        }

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Admin_items;