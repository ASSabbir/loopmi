import { useEffect, useState } from "react";
import useRole from "../Root/useRole";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const ConfirmOrdr = () => {
    const [totalData, setTotalData] = useState(0)
    const [activePage, setActivePage] = useState(0)
    const [users] = useRole()

    useEffect(() => {
        axios.get('https://loopmi-server.vercel.app/confirmorders_count')
            .then(res => setTotalData(res.data.count))
    }, [])
    const numberOfPages = Math.ceil(totalData / 8)
    const pages = [...Array(numberOfPages).keys()]

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['orders items', activePage],
        queryFn: async () => {
            const res = await axios.get(`https://loopmi-server.vercel.app/vendor_confirm_orders?limit=8&skip=${activePage}&email=${users.email}`)
            return res.data
        }
    })
    if (isLoading) {
        return <div className='flex items-center justify-center w-full pt-2 h-screen'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    
    const handelCancel = async(id) => {
        Swal.fire({
            title: "Mark Order as Delivered?",
            text: "Are you sure you want to mark this order as delivered? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff6b6b", // Custom confirm color (red)
            cancelButtonColor: "#6c757d",  // Custom cancel button color (gray)
            confirmButtonText: "Yes, mark as delivered!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Perform the cancel order action
                axios.delete(`https://loopmi-server.vercel.app/cancel_order/${id}`)
                    .then(res => refetch());
    
                
                Swal.fire({
                    title: "Order Delivered!",
                    text: "The order has been successfully marked as delivered.",
                    icon: "success",
                    confirmButtonColor: "#4caf50" 
                });
            }
        });
    };
    

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
                            Confirm Orders
                        </h1>
                        <p className="mt-6 mb-8 md:text-lg sm:mb-12 text-sm  ">
                            Vendors can review and manage their pending orders, ensuring timely processing and fulfillment. This allows for better order tracking and smoother transactions.
                        </p>

                    </div>

                </div>
            </section>
            <div>
                {data.length === 0 && <div className="flex items-center  justify-center w-full mt-24 ">
                    <h1 className="text-2xl font-bold text-color5">No Orders Available</h1>
                    </div>}
                <div className="max-w-screen-2xl p-2 my-20 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center  self-center">
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
                                <h1 className='font-semibold text-color6 mb-2'>Customer Details</h1>
                                <h1 className="text-sm md:text-base">Name : {item.CustomerName}</h1>
                                <h1 className="text-sm md:text-base">Email : {item.CustomerEmail}</h1>
                                <h1 className="text-sm md:text-base">Phone : {item.CustomerPhone}</h1>
                                <h1 className="text-sm md:text-base">Address : {item.CustomerAddress}</h1>
                                <div className='w-full mt-4'>
                                    <div className='flex justify-between'>
                                        <button disabled className='bg-color1 text-white px-2 p-1 rounded-md'>Confirmed</button>
                                        <button onClick={() => handelCancel(item._id)} className='bg-color5 text-white px-2 p-1 rounded-md'>Mark as Done </button>

                                    </div>

                                </div>
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

export default ConfirmOrdr;