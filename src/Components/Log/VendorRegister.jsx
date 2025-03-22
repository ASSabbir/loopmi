import  { useContext, useState } from 'react';
import register from '../../assets/undraw_woman_nxse.png';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

import Swal from 'sweetalert2';

import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../Root/AuthProvider';
import { auth } from '../Root/firebase.config';

const VendorRegister = () => {
    const { handelSignup } = useContext(AuthContext)
    const [flag, setFlag] = useState(false)
    const navg = useNavigate()
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


    // from submit function 
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFlag(true)
        const formData = new FormData();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const address = e.target.address.value;
        const telephone = e.target.telephone.value;
        const role = 'Vendor';
        const password = e.target.password.value;
        const photoFile = e.target.photo.files[0];

        if (username === '' || email === '' || username === '' || password === '' || photoFile == '' ) {
            Toast.fire({
                icon: "error",
                title: 'All fields must be filled out.'
            });
            setFlag(false)
            return
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        // handel imgbb 
        if (!passwordRegex.test(password)) {
            Toast.fire({
                icon: "error",
                title: ' Must be One UpperCase , One LowerCase & 6 Chareacter'
            });
            setFlag(false)
            return
        }

        formData.append('image', photoFile);
        const response = await axios.post('https://api.imgbb.com/1/upload?key=7184d4d0cc210ac09f545d7688fa5876', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const url = response.data.data.display_url;
        console.log(response)

        // handel firebase
        if (response.data.success) {
            handelSignup(email, password)
                .then(user => {
                    setFlag(false)
                    localStorage.setItem('user',JSON.stringify(email))
                    updateProfile(auth.currentUser, {
                        displayName: username, photoURL: url
                    })
                        .then(() => {

                            Toast.fire({
                                icon: "success",
                                title: `WelCome ${auth.currentUser.displayName} `
                            });
                            const user = { email, role,address,telephone }
                            console.log(user)
                            axios.post('https://loopmi-server.vercel.app/users', user)
                                .then(res => console.log(res.data))
                                .catch(error => { console.log(error) })
                            navg(location.state ? location.state : '/')
                        }).catch((erro) => {
                            console.log(erro)
                        });
                    

                })
                .catch(error => {
                    Toast.fire({
                        icon: "error",
                        title: error
                    });
                    setFlag(false)
                })
        }
        else{
            setFlag(false)
        }
    };
    

    return (
        <div className="hero   ">
            <div className="hero-content  mt-16 py-14 flex-col justify-stretch gap-20 md:flex-row-reverse">
                <div className="text-center md:w-1/2 lg:text-left">
                    <img src={register} alt="Register" className="md:w-[44vw]" />
                </div>
                <div className="card bg-base-100 md:w-1/2 w-full max-w-sm shrink-0">
                    <div className="w-full max-w-md p-8 space-y-3 rounded-xl border-[1px] text-gray-800">
                        <h1 className="text-3xl text-color6 font-Montserrat  font-semibold  text-center">Create a Vendor account</h1>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="space-y-1 text-sm">
                                <label htmlFor="username" className="block text-gray-600">Username</label>
                                <input required type="text" name="username" placeholder="Username" className="w-full px-4 py-3 rounded-md border-gray-300 border-2 bg-gray-50 text-gray-800" />
                            </div>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="email" className="block text-gray-600">Email</label>
                                <input required type="email" name="email" placeholder="vendor65@gmail.com" className="w-full border-2 px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                            </div>
                           
                            <div className="space-y-1 text-sm">
                                <label htmlFor="address" className="block text-gray-600">Address</label>
                                <input required type="text" name="address" placeholder="90 park road, dhaka" className="w-full border-2 px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                            </div>
                           
                            
                            <div className="space-y-1 text-sm">
                                <label htmlFor="" className="block text-gray-600">Telephone</label>
                                <input required type="number" name="telephone" placeholder="236589410" className="w-full border-2 px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                            </div>
                           
                            <div className="space-y-1 text-sm">
                                <label htmlFor="password" className="block text-gray-600">Password</label>
                                <input required type="password" name="password" placeholder="Password" className="w-full border-2 px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                            </div>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="photo" className="block text-gray-600">Photo</label>
                                <input required type="file" name="photo" className="file-input file-input-[#2d3c44] file-input-bordered w-full max-w-xs" />
                            </div>
                            {
                                flag ?

                                    <button disabled className="block w-full p-3 text-center  rounded-sm text-gray-50 bg-[#80A5DC] ">
                                        <span className="loading loading-bars loading-sm"></span>
                                    </button>
                                    :
                                    <button  className="block w-full p-3 text-center hover:bg-color4 rounded-sm text-gray-50 bg-color5 duration-200">
                                        Sign Up
                                    </button>
                            }
                        </form>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorRegister;
