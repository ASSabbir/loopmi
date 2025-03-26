
import './style.css'
import img1 from '../../assets/4.jpg'
import img2 from '../../assets/3.jpg'
import img3 from '../../assets/6.jpg'
import png1 from '../../assets/e-01.png'
import png2 from '../../assets/Untitled-2-01.png'
import png3 from '../../assets/c-01.png'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
const Banner = () => {
    return (
        <section className="text-gray-800   relative overflow-hidden">
            {/* Background Gradient Blur Divs */}
            <div className="absolute inset-0 flex justify-center">
                <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute right-20 top-1/2 -z-10"></div>
                <div className='bg-color1 lg:h-screen w-full opacity-30'></div>
                <div className="w-[100px] h-[200px] bg-color3 blur-[50px] rounded-full absolute right-20 top-32 -z-10"></div>
                <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute left-2
         bottom-64 -z-10"></div>
            </div>

            {/* Main Content */}
            <div className="max-w-screen-2xl  relative z-10 flex flex-col mt-28 lg:mt-1 lg:h-screen h-auto justify-center items-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                <div className="md:w-1/2 md:px-28 lg:px-0  ">
                    <h1 className="text-2xl text-color6 sm:text-4xl lg:!leading-[4.5vw] font-bold lg:text-7xl">
                        Recycled Goods, Better Future
                    </h1>
                    <p className="mt-6 mb-13 text-sm md:text-lg sm:mb-12 ">
                        Explore a wide range of recycled products and shop sustainably. Give new life to pre-loved items while supporting a greener future.
                    </p>
                    {/* <div className="relative flex items-center  ">
                        <input type="text" placeholder="Search here" className="input w-full rounded-full md:max-w-xl  px-6 md:h-16 border-[2px] border-zinc-100" />
                        <button id="button" className="duration-150 right-12 md:right-14 p-2 md:p-3 text-white text-2xl rounded-full relative"><CiSearch /></button>
                    </div> */}
                    <Link className='px-9  py-5 bg-gradient-to-r from-color2 via-color4 to-color5  rounded-full  text-white' to={'/shop'}><button>View All Products</button></Link>
                </div>
                <div className=" relative md:w-1/2 mt-7  lg:mt-0 h-full items-center gap-2   grid grid-cols-2">
                    <div className='w-full flex justify-end'>
                        <img src={img1} alt="" className='w-52 rounded-2xl' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <img src={img3} alt="" className='w-48 rounded-2xl' />
                        <img src={img2} alt="" className='w-72 rounded-2xl' />
                    </div>
                    <div
                        className='jump-infinite w-24 rounded-xl border-2 border-color1 flex justify-center items-center flex-col text-white h-24 left-1/2 -ml-10  bg-color5 absolute'>
                        <h1 className='text-xl font-bold'>10k</h1>
                        <h1>Products</h1>

                    </div>
                    <motion.img
                        animate={{
                            scale: [1.1, 0.8, 1.1],

                        }}
                        transition={{
                            duration: 15,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "mirror"
                        }}
                        className='absolute -z-10 top-[45%] right-[35%]' src="https://dpmarketwp.wowtheme7.com/wp-content/uploads/2024/05/dots-white.png" alt="" id='zoom-image' />
                </div>
            </div>
            {/* <img src={png1} className='rotate-rounding  w-32 absolute bottom-0' alt="" /> */}
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
        </section>

    );
};

export default Banner;