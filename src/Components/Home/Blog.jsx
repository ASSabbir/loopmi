import png1 from '../../assets/e-01.png'
import png2 from '../../assets/Untitled-2-01.png'
import png3 from '../../assets/c-01.png'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { IoIosCalendar } from 'react-icons/io';

const Blog = () => {
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
            <div className="max-w-screen-2xl   relative z-10 flex flex-col mt-28 lg:mt-1 lg:h-screen h-auto justify-center items-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                <section className=" mx-auto ">
                    <div className="  p-6 mx-auto space-y-6 sm:space-y-12">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-4xl font-semibold'>Browse All Latest <br />
                            Blogs And Articles</h1>
                            <Link className='px-9  py-5 bg-gradient-to-r from-color2 via-color4 to-color5  rounded-full  text-white' to={'/'}><button>View All Products</button></Link>
                        </div>
                        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div  className="max-w-sm mx-auto group  hover:no-underline focus:no-underline dark:bg-gray-50">
                                <img  className="object-cover overflow-hidden w-full rounded h-64 group-hover:scale-105 duration-150 dark:bg-gray-500" src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                <div className="p-6 space-y-2 overflow-hidden">
                                    <h3 className="text-2xl font-semibold group-hover:text-color5 group-focus:underline">In usu laoreet repudiare legendos</h3>
                                    <div className='flex items-center  gap-2'>
                                    <IoIosCalendar  className='text-lg'/>
                                    <span className="text- dark:text-gray-600">January 21, 2021</span>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                                <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?2" />
                                <div className="p-6 space-y-2">
                                    <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
                                    <span className="text-xs dark:text-gray-600">January 22, 2021</span>
                                    <p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
                                </div>
                            </a>
                            <a rel="noopener noreferrer" href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                                <img role="presentation" className="object-cover w-full rounded h-44 dark:bg-gray-500" src="https://source.unsplash.com/random/480x360?3" />
                                <div className="p-6 space-y-2">
                                    <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">In usu laoreet repudiare legendos</h3>
                                    <span className="text-xs dark:text-gray-600">January 23, 2021</span>
                                    <p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
                                </div>
                            </a>
                            
                            
                        </div>
                        <div className="flex justify-center">
                            <button type="button" className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600">Load more posts...</button>
                        </div>
                    </div>
                </section>
            </div>

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

export default Blog;