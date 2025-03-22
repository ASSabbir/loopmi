
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import useRole from "../Root/useRole";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Root/AuthProvider";
import Swal from "sweetalert2";



const ShopCard = () => {
    const { setCartCount } = useContext(AuthContext)
    const [cart, setCart] = useState([])
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || []
        setCart(savedCart)
        setCartCount(savedCart.length)
    }, [])
    const { id } = useParams()
    
    const [users] = useRole()

    const { data, isLoading } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await axios.get(`https://loopmi-server.vercel.app/item/${id}`)
            return res.data
        }
    })

    const { data: relatedItems } = useQuery({
        queryKey: ['relatedItems', id],
        queryFn: async () => {
            const res = await axios.get(`https://loopmi-server.vercel.app/related-products`)
            return res.data
        },
        enabled: !!id
    })
    

    if (!users || isLoading) {
        return <div className='flex items-center justify-center w-full pt-2 h-screen'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handelCart = (item) => {
        const updetedCart = [...cart, item]
        localStorage.setItem('cart', JSON.stringify(updetedCart));
        setCartCount(updetedCart.length)
        Toast.fire({
            icon: "success",
            title: "Add To Card"
        });
    }
    const handleAddReview = (item) => {
        Swal.fire({
            title: "Add a Review",
            html: `
            <textarea id="review-text" class="swal2-input" 
    placeholder="Write your review..." 
    style="height: 100px; border: 2px solid #ccc; border-radius: 5px; padding: 5px;"></textarea>

<select id="review-rating" class="swal2-input">
    <option value="5">⭐️⭐️⭐️⭐️⭐️ (5)</option>
    <option value="4">⭐️⭐️⭐️⭐️ (4)</option>
    <option value="3">⭐️⭐️⭐️ (3)</option>
    <option value="2">⭐️⭐️ (2)</option>
    <option value="1">⭐️ (1)</option>
</select>
          `,
            showCancelButton: true,
            confirmButtonText: "Submit",
            preConfirm: () => {
                const reviewText = document.getElementById("review-text").value;
                const rating = document.getElementById("review-rating").value;

                if (!reviewText.trim()) {
                    Swal.showValidationMessage("Review cannot be empty!");
                    return false;
                }

                return { reviewText, rating };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                
                
                const review={
                    review:result.value.reviewText,
                    rating:result.value.rating,
                    user:users,
                    product:item

                }
                console.log(review)
                axios.post('http://localhost:5000/reviews',review)
                .then(()=>{
                    Swal.fire("Thank You!", "Your review has been submitted.", "success");
                })
                // 👉 You can send `result.value` (reviewText & rating) to your backend here.
            }
        });
    };
    return (
        <div className="mt-20">
            <section className="text-gray-800   relative overflow-hidden">
                {/* Background Gradient Blur Divs */}
                <div className="absolute inset-0 flex justify-center">
                    <div className="w-[450px] h-[300px] bg-color5 blur-[100px] rounded-full absolute right-20 top-1/2 -z-10"></div>
                    <div className='bg-color1  w-full opacity-30'></div>
                    <div className="w-[600px] h-[200px] bg-color3 blur-[50px] rounded-full absolute right-20 top-32 -z-10"></div>
                    <div className="w-[450px] h-[500px] bg-color5 blur-[100px] rounded-full absolute left-2
                 bottom-64 -z-10"></div>
                </div>

                {/* Main Content */}
                <div className="max-w-screen-2xl relative z-10 flex flex-col  justify-center items-center p-6 mx-auto sm:py-12 lg:py-12 lg:flex-row lg:justify-center">
                    <div className=" md:w-[90%] flex flex-col justify-center">
                        <nav aria-label="breadcrumb" className="w-full   text-gray-800">
                            <ol className="flex h-8 space-x-2 text-gray-800">
                                <li className="flex items-center">
                                    <a rel="noopener noreferrer" href="/" title="Back to homepage" className="flex items-center hover:underline">Home</a>
                                </li>
                                <li className="flex items-center space-x-1">
                                    <span className="text-gray-600"><IoIosArrowForward /></span>
                                    <a rel="noopener noreferrer" href="/shop" className="flex items-center px-1 capitalize hover:underline">Item</a>
                                </li>
                                <li className="flex items-center space-x-1">
                                    <span className="text-gray-600"><IoIosArrowForward /></span>
                                    <a rel="noopener noreferrer" href="#" className="flex items-center px-1 capitalize ">{data.title}</a>
                                </li>

                            </ol>
                        </nav>
                        <h1 className="text-5xl font-bold mt-2">{data.title}</h1>
                        <div className="flex space-x-1 mt-5 items-center">
                            <h1>By</h1>
                            <h1 className="text-color5">{data.vendorUsername}</h1>
                            <h1 className="text-xl pl-2"><MdDone /></h1>
                            <h1>Recently Updated</h1>
                            <h1 className="text-xl pl-2"><MdDone /></h1>
                            <h1>Well Documented</h1>
                        </div>
                    </div>

                </div>
            </section>
            <div className="max-w-screen-2xl my-7 gap-7 mx-auto flex md:flex-row flex-col ">
                <img src={data.photo} alt="" className=" rounded-lg md:h-[600px] object-cover md:w-[60%]" />
                <div className=" bg-gray-100 rounded-lg flex flex-col justify-between p-8 md:w-[40%] ">
                    <h1 className="text-2xl font-bold">Price : ${data.price}</h1>
                    <div className="divider"></div>
                    <h1>{data.description}</h1>
                    <h1 className="mt-7"><span className="font-semibold">Category</span> : {data.category} </h1>
                    <h1 className="mt-2"><span className="font-semibold">Condition</span> : {data.condition} </h1>
                    <h1 className="mt-2"><span className="font-semibold">Location</span> : {data.location} </h1>
                    <div className="divider"></div>
                    {
                        users.role == 'Customer' ?
                            <button onClick={() => handelCart(data)} className="bg-color5 p-3 text-white">Add To card</button>
                            :
                            <div>
                                <button disabled className="bg-color3 p-3 text-white">Add To card</button>
                                <p className="text-red-400 mt-2">! Only Customer can add in card</p>
                            </div>


                    }

                    <div className="flex justify-end">
                        <button onClick={()=>handleAddReview(data)} className="bg-color5 w-fit  p-1 text-sm  text-white mt-10">Add Review </button>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-2xl my-7  mx-auto  ">
                <h1 className="text-4xl font-bold mb-10 mt-16">You May Also Like </h1>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-7">
                    {relatedItems?.map((item, index) => (
                        <Link to={`/item/${item._id}`}
                            key={index}
                            className="card h-96 bg-white border-[1px]    rounded-2xl shadow-sm   w- cursor-pointer">
                            <figure className='md:h-40 lg:h-64 h-24'>
                                <img
                                    src={item.photo}
                                    alt={item.title}
                                    className='object-cover object-center h-full w-full '
                                />
                            </figure>
                            <div className="md:p-5 p-2 flex flex-col md:gap-2 justify-between   rounded-b-lg ">
                                <h2 className="font-bold font-Open_Sans">{item.title || "Default Title"}</h2>
                                <div className='flex justify-between mt-3'>
                                    <h1 className='hidden md:flex'>by {item.vendorUsername}</h1>
                                    <h1 className='font-semibold'>${item.price}</h1>

                                </div>
                                <div className="divider hidden md:flex"></div>
                                <h1 className='hidden md:flex'>Category : {item.category}</h1>
                                <div className=' '>
                                    <div className="rating rating-xs">
                                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                        <input
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                            defaultChecked />
                                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                    </div>

                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* <div className="max-w-screen-2xl my-7 gap-7 mx-auto flex md:flex-row flex-col ">
                <div className=" bg-gray-100 rounded-lg p-8 md:w-[60%] ">
                    <h1 className="text-2xl font-bold">Vendor Details</h1>
                    <div className="divider"></div>
                    <h1><span className="font-semibold">Vendor Name</span> : {data.vendorUsername} </h1>
                    <h1 className="mt-2"><span className="font-semibold">Vendor Email</span> : {data.vendorEmail} </h1>
                    <h1 className="mt-2"><span className="font-semibold">Vendor Phone</span> : {data.vendorPhone} </h1>
                    <h1 className="mt-2"><span className="font-semibold">Vendor Location</span> : {data.vendorLocation} </h1>
                    <div className="divider"></div>
                </div>
                <div className=" bg-gray-100 rounded-lg p-8 md:w-[40%] ">
                    <h1 className="text-2xl font-bold">Product Details</h1>
                    <div className="divider"></div>
                    <h1><span className="font-semibold">Category</span> : {data.category} </h1>
                    <h1 className="mt-2"><span className="font-semibold">Condition</span> : {data.condition} </h1>
                    <h1 className="mt-2"><span className="font-semibold">Location</span> : {data.location} </h1>
                    <h1 className="mt-2"><span className="font-semibold">Price</span> : ${data.price} </h1>
                    <div className="divider"></div>
                </div>

            </div> */}
        </div>
    );
};

export default ShopCard;