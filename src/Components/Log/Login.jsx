import { Link, useNavigate } from 'react-router-dom';
import login from '../../assets/undraw_woman_nxse.png'
import { useContext, useState } from 'react';

import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../Root/AuthProvider';
import { FaEye } from 'react-icons/fa';

const Login = () => {
    const [eye,setEye]=useState(false)
    const { handelSignin, googleSign } = useContext(AuthContext)
    const [flag,setFlag]=useState(false)
    const navg = useNavigate()
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    const handelSubmit = (e) => {
        e.preventDefault();
        setFlag(true)
        const email = e.target.email.value
        const password = e.target.password.value
        if (email === '' || password === '') {
            Toast.fire({
                icon: "error",
                title: 'All fields must be filled out.'
            });
            setFlag(false)
            return
        }
        
        handelSignin(email, password)
            .then(user2 => {
                Toast.fire({
                    icon: "success",
                    title: `WelCome ${user2.user.displayName} `
                });
                
                localStorage.setItem('user',JSON.stringify(email))
                // const user = { email: email }
                // console.log(user)
                // axios.post('https://motorent-beta.vercel.app/jwt',user,{withCredentials:true})
                //   .then(data => {
                //     console.log(data.data)
                //   })
                // fetch('https://motorent-beta.vercel.app/jwt', {
                //   method: "POST",
                //   headers: {
                //     "Content-Type": "application/json",
                //   },
                //   body: JSON.stringify(user),
                // })
                // .then(res=>res.json())
                // .then(data=>console.log(data))
                setFlag(false)
                navg(location.state ? location.state : '/')

            })
            .catch(error => {
                console.log(error)
                Toast.fire({
                    icon: "error",
                    title: error.code
                });
                setFlag(false)
            })

    }
    const handelgoogle = () => {
        googleSign()
            .then((user2) => {
                Toast.fire({
                    icon: "success",
                    title: `WelCome ${user2.user.displayName} `
                });
                localStorage.setItem('user',JSON.stringify(user2.user.email))
                
                // const user={email:user2.user.email,role:'Student'}
                // axios.post('https://learnbridge-red.vercel.app/users', user)
                //     .then(res => console.log(res.data))
                //     .catch(error => { console.log(error) })

                navg(location.state ? location.state : '/')
                

            })
            .catch(error => {
                Toast.fire({
                    icon: "error",
                    title: error.code
                });
                console.log(error)
            })
    }
    return (
        <div className="hero  ">
            <div className="flex gap-14 py-32 mt-12 items-center  max-w-screen-2xl  w-full m-a  flex-col lg:flex-row-reverse">
                <div className="text-center  w-1/2 lg:text-left ">
                    <img src={login} alt="" className='w-96' />
                </div>
                <div className=" bg-base-100 w-1/2   max-w-sm shrink-0 ">
                    <div className="w-full max-w-md p-12  w-fullspace-y-3 rounded-xl border-[1px]   text-gray-800">
                        <h1 className="text-4xl text-color6 font-Montserrat  font-semibold text-center">Login Here</h1>
                        <form onSubmit={handelSubmit} className="space-y-6 mt-5 w-full ">
                            <div className="space-y-1 text-sm">
                                <label className="block text-gray-600">Email</label>
                                <input type="text" name="email" placeholder="email" className="w-full px-4 py-3 rounded-md border-gray-300 border-2 bg-gray-50 text-gray-800 " />
                            </div>
                            <div className="space-y-1 text-sm relative">
                                <label className="block text-gray-600">Password</label>
                                <input type="password" name="password" placeholder="Password" className="w-full border-2 px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 " />
                                {/* <FaEye className='absolute right-2 top-1/2 text-lg'/> */}
                            </div>
                            {
                                flag ?
                                    
                                    <button disabled className="block w-full p-3 text-center  rounded-sm text-gray-50 bg-color4 ">
                                    <span className="loading loading-bars loading-sm"></span>
                                  </button>
                                    :
                                    <button  className="block w-full p-3 text-center hover:bg-color4 rounded-sm text-gray-50 bg-color5 duration-200">
                                        Sign In
                                    </button>
                            }
                        </form>
                        <div className="flex items-center pt-4 space-x-1">
                            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                            <p className="px-3 text-sm text-gray-600">Login with social accounts</p>
                            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handelgoogle} aria-label="Log in with Google" className="p-3 rounded-sm ">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current hover:fill-color2 duration-150">
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                            </button>
                            <button aria-label="Log in with Twitter" className="p-3 rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current hover:fill-color2 duration-150">
                                    <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                                </svg>
                            </button>

                        </div>
                        <p className="text-xs text-center sm:px-6 text-gray-600">Dont have an account?
                            <Link to={'/register'} className="underline text-gray-800"> Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;