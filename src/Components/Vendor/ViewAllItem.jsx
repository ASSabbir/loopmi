import { useQuery } from "@tanstack/react-query";
import useRole from "../Root/useRole";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";


const ViewAllItem = () => {
    const [users] = useRole()
    console.log(users)
    const { data: items, isLoading, refetch } = useQuery({
        queryKey: ['items', 'allitems'],
        queryFn: async () => {
            const res = await axios.get(`https://loopmi-server.vercel.app/vendor_items?email=${users.email}`);
            return res.data;
        }
    })

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
                        Vendor Listed Items
                        </h1>
                        <p className="mt-6 mb-8 md:text-lg sm:mb-12 text-sm  ">
                        View and manage all the products you have added as a vendor. Update details, track listings, and ensure your items are ready for customers.
                        </p>

                    </div>

                </div>
            </section>
            <div>
                <div className="max-w-screen-2xl p-2 my-20 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center  self-center">
                    {items?.map((item, index) => (
                        <Link
                            key={index}
                            className="card  glass w- cursor-pointer">
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
                                <h1 className='font-semibold text-color6 mb-2'>Product Details</h1>
                                <h1 className="text-sm md:text-base">Condition : {item.condition}</h1>
                                <h1 className="text-sm md:text-base">Category : {item.category}</h1>
                                <h1 className="text-sm md:text-base">Location : {item.location}</h1>
                                <h1 className="text-sm md:text-base">Vendor Name : {item.vendorUsername}</h1>
                                <div className='flex justify-end mt-2'>
                                    <button onClick={() => handelDelete(item._id)} className='bg-red-500 text-white text-xl px-2 p-1 rounded-md'><MdDeleteForever /></button>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
                
            </div>
        </div>
    );
};

export default ViewAllItem;