import  { useContext, useState } from 'react';

import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../Root/AuthProvider';
import useRole from '../Root/useRole';



const Add_items = () => {
    const { user } = useContext(AuthContext);
    const [flag, setFlag] = useState(false)
    const [users, isLoading] = useRole()

    if (!user || isLoading) {
        return <div className='flex items-center justify-center w-full pt-2 h-screen'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    const handelSerssion = async (e) => {

        e.preventDefault();
        
        const formData = new FormData();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const category = e.target.type.value;
        const condition = e.target.condition.value;
        const price = e.target.price.value;
        const location = e.target.location.value;
        const vendorEmail = user.email;
        const vendorUsername = user.displayName;
        const photoFile = e.target.photo.files[0];
        setFlag(true)
        // Logging the values to the console for testing
        const cart = {
            title,
            description,
            condition,
            category,
            price,
            location,
            vendorEmail,
            vendorUsername

        }
        
        Swal.fire({
            title: "Are you Sure ?",
            text: "Please check once before submitting",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Check",
            confirmButtonColor: "#5f9877",

            cancelButtonColor: "#0c2b23",
            confirmButtonText: "Yes, Post it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                formData.append('image', photoFile);

                const response = await axios.post('https://api.imgbb.com/1/upload?key=7184d4d0cc210ac09f545d7688fa5876', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response)
                
                const url = response.data.data.display_url;

                const newCart = { ...cart, photo: url }

                axios.post('https://loopmi-server.vercel.app/carts', newCart)
                    .then(res => {
                        setFlag(false)
                        if (res.data.acknowledged == true) {
                            Swal.fire({
                                title: "Post Done!",
                                text: "Your file has been Saved",
                                icon: "success"
                            });
                        }
                        
                    })

            }
            setFlag(false)
        });
        
    };

    return (
        <section className="p-6 bg-gray-100 ">
            <form onSubmit={handelSerssion} className="container flex flex-col mx-auto space-y-12">
                <div className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium text-xl font-Noto">Product Information</p>
                        <p className="text-xs text-gray-500 font-Noto">Easily add your recycled products, set a price, and connect with buyers who care about sustainability.</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Product Name</label>
                            <input required name="title" type="text" placeholder="Title" className="w-full rounded-md p-2 border-[1px] text-gray-900" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Product Description</label>
                            <input required  name="description" type="text" placeholder="Description" className="w-full rounded-md text-gray-900 p-2 border-[1px]" />
                        </div>

                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Condition</label>
                            <input required name="condition" type="text" placeholder="New" className="w-full rounded-md text-gray-900 p-2 border-[1px]" />
                        </div>

                        <div className="col-span-full sm:col-span-2">
                            <label className="text-sm">Price</label>
                            <input required name="price" type="number" defaultValue="0" className="w-full rounded-md text-gray-900 p-2 border-[1px]" />
                        </div>
                        <div className="space-y-1 text-sm col-span-full sm:col-span-3">
                            <label htmlFor="photo" className="block ">Provide a photo</label>
                            <input required type="file" name="photo" className="file-input rounded-lg p-2 cursor-pointer border-2 file-input-[#2d3c44] file-input-bordered w-full max-w-xs" />
                        </div>
                        <div className="space-y-1 sm:col-span-2 text-sm ">
                            <label htmlFor="role" className="block text-gray-600">Category</label>
                            <select required name="type" defaultValue="Student" className="select select-bordered w-full border-2 px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800">
                                <option className="text-gray-800">Home Decor</option>
                                <option className="text-gray-800">Fashion</option>
                                <option className="text-gray-800">Home Essentials</option>
                                <option className="text-gray-800">Accessories</option>
                                <option className="text-gray-800">Handmade Diaries</option>

                            </select>
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label className="text-sm">Location</label>
                            <input required name="location" type="text" placeholder='Dhaka' className="w-full rounded-md text-gray-900 p-2 border-[1px]" />
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium text-xl font-Noto">Vendor Information</p>
                        <p className="text-xs font-Noto text-gray-500">Get to know the seller before making a purchase. Browse their products, check reviews, and shop with confidence from trusted sellers.</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Vendor username</label>
                            <input disabled type="text" name="username" defaultValue={user ? user.displayName : 'Username'} className="w-full rounded-md text-gray-900 p-2 border-[1px]" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Vendor email</label>
                            <input disabled type="email" defaultValue={user ? user.email : 'Email'} className="w-full rounded-md text-gray-900 p-2 border-[1px]" />
                        </div>
                    </div>
                </div>
                {
                    users.role == 'Customer' ?
                        <div className="p-6 flex justify-end rounded-md shadow-sm bg-gray-50">
                            <button disabled className="px-4 text-xl font-Noto py-2 w-32 bg-color3 cursor-not-allowed text-white hover:text-white rounded-md border-gray-800">
                                Be a Vendor
                            </button>
                            <h1 className='text-red-500 mt-2'>!Only vendors can post</h1>
                        </div>
                        :
                        flag ?
                            <div className="p-6 flex justify-end rounded-md shadow-sm bg-gray-50">
                                <button disabled className="px-4 text-xl font-Noto py-2 w-32 bg-color3  text-white  rounded-md border-gray-800">
                                    <span className="loading loading-bars loading-sm"></span>
                                    
                                </button>
                            </div>
                            :
                            <div className="p-6 flex justify-end rounded-md shadow-sm bg-gray-50">
                                <button type="submit" className="px-4 text-xl font-Montserrat py-2 w-32  hover:bg-color3 duration-150 bg-color5 text-white hover:text-white rounded-md border-gray-800">
                                    Add Item
                                </button>
                            </div>
                }

            </form>
        </section>
    );
};

export default Add_items;
