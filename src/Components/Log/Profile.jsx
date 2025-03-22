import { useContext } from "react";
import { AuthContext } from "../Root/AuthProvider";
import useRole from "../Root/useRole";
import { CgMail } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import png1 from '../../assets/e-01.png'
import png2 from '../../assets/Untitled-2-01.png'
import png3 from '../../assets/c-01.png'
import { motion } from "framer-motion";

const Profile = () => {
    const { user, logout, emailVarification, forgetPassword, } = useContext(AuthContext)
    const navg = useNavigate()
    const [users, isLoading] = useRole()
    console.log(user)
    if (isLoading) {
        return <div className='flex items-center justify-center w-full pt-2 h-screen'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }


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
    const handelpassword = () => {
        forgetPassword(users.email)
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: `Email send`,
                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handelVerification = () => {
        emailVarification()
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: `Email send`,
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handelLogout = () => {
        logout()
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: `LogOut success`,
                });
                localStorage.removeItem('user')
                navg('/')
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className="mt-20 relative">
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
                <div className="max-w-screen-2xl relative z-10 flex flex-col h-64  justify-center items-center p-6 mx-auto sm:py-12 lg:py-12 lg:flex-row lg:justify-center">
                    <motion.img
                        src={png1}
                        alt=""
                        className="w-32 absolute bottom-40 left-10"
                        animate={{
                            rotate: [0, 360], // Rotates continuously
                            y: [0, -100, 0, 100, 0], // Moves up and down
                        }}
                        transition={{
                            rotate: {
                                duration: 20, // Adjust for smooth rotation
                                ease: "linear",
                                repeat: Infinity,
                            },
                            y: {
                                duration: 30, // Adjust for floating speed
                                ease: "easeInOut",
                                repeat: Infinity,
                            },
                        }}
                    />
                    <motion.img
                        src={png2}

                        className="w-20 absolute top-40 right-10"
                        animate={{
                            rotate: [0, 360], // Rotates continuously
                            y: [0, -100, 0, 100, 0], // Moves up and down
                        }}
                        transition={{
                            rotate: {
                                duration: 20, // Adjust for smooth rotation
                                ease: "linear",
                                repeat: Infinity,
                            },
                            y: {
                                duration: 30, // Adjust for floating speed
                                ease: "easeInOut",
                                repeat: Infinity,
                            },
                        }}
                    />
                    <motion.img
                        src={png3}

                        className="w-32 absolute bottom-0 right-40"
                        animate={{
                            rotate: [0, 360], // Rotates continuously
                            x: [0, -100, 0, 100, 0], // Moves up and down
                        }}
                        transition={{
                            rotate: {
                                duration: 20, // Adjust for smooth rotation
                                ease: "linear",
                                repeat: Infinity,
                            },
                            x: {
                                duration: 50, // Adjust for floating speed
                                ease: "easeInOut",
                                repeat: Infinity,
                            },
                        }}
                    />

                </div>

            </section>
            <div className="flex flex-col justify-center w-full md:w-[40%] p-6 shadow-md rounded-xl sm:px-12 bg-gray-50 text-gray-800 left-[50%] translate-x-[-50%] absolute bottom-24">
                <div className="relative">
                    <img src={user?.photoURL} alt="" className="w-32 object-cover h-32 mx-auto rounded-full bg-gray-500 aspect-square" />
                    <h1 className="bg-color5 w-fit px-3 text-sm absolute bottom-0 left-[55%] rounded-xl text-white">
                        {user.emailVerified ? 'Verified' : 'Unverified'}
                    </h1>
                </div>
                <div className="space-y-4 text-center ">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl">{user?.displayName}</h2>
                        <p className="px-5 text-xs sm:text-base text-gray-600">{users?.role}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2 pb-5">
                        <div className="flex items-center gap-1">
                            <CgMail className="text-xl" />
                            <h1>{users?.email}</h1>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaRegAddressCard className="" />
                            <h1>{users?.address}</h1>
                        </div>
                        <div className="flex items-center gap-1">
                            <FiPhoneCall />
                            <h1>{users?.telephone}</h1>
                        </div>
                    </div>
                    <div className="flex justify-between items-center ">

                        <button onClick={handelLogout} className='px-4  py-1 text-sm  bg-gradient-to-r from-color2 via-color4 to-color5  rounded-full  text-white' >Log out</button>
                        <button onClick={handelpassword} className='px-4  py-1 text-sm  bg-gradient-to-r from-color2 via-color4 to-color5  rounded-full  text-white' >Forget password</button>
                        <button onClick={handelVerification} className='px-4  py-1 text-sm  bg-gradient-to-r from-color2 via-color4 to-color5  rounded-full  text-white' >Verify</button>
                    </div>
                </div>
            </div>
            <div className="h-96">

            </div>
        </div>
    );
};

export default Profile;