
import { Link } from 'react-router-dom';
import useItem from '../Root/useItem';
import png1 from '../../assets/b-01.png'
import png2 from '../../assets/Untitled-2-01.png'
import { motion } from "framer-motion";

const NewArrival = () => {
    const [items] = useItem()


    return (
        <section className="text-gray-800   relative overflow-hidden">
            <div className="max-w-7xl mx-auto container">

            {/* Background Gradient Blur Divs */}
            <div className="absolute inset-0 flex justify-center">
                <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute right-20 top-1/2 -z-10"></div>
                <div className='bg-color1 h-full w-full opacity-30'></div>
                <div className="w-[100px] h-[200px] bg-color3 blur-[50px] rounded-full absolute right-20 top-32 -z-10"></div>
                <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute left-2
                 bottom-64 -z-10"></div>
            </div>

            {/* Main Content */}
            <div className="max-w-screen-2xl relative z-10   p-6 mx-auto py-24  ">
                <h1 className='text-5xl text-center font-bold mt-20 mb-16'>New Arrival Products</h1>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {items?.map((item, index) => (
                        <Link to={`/item/${item._id}`}
                            key={index}
                            className="card h-96 bg-white   rounded-2xl shadow-sm border-white  w- cursor-pointer">
                            <figure className='md:h-40 lg:h-64 h-24'>
                                <img
                                    src={item.photo}
                                    alt={item.title}
                                    className='object-cover object-center h-full w-full '
                                />
                            </figure>
                            <div className="md:p-5 p-2 flex flex-col md:gap-2 justify-between  ">
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
                <div className='w-full flex justify-center mt-10'>
                    <Link id='button' className='px-9 py-5  rounded-full text-white' to={'/shop'}><button>View All Products</button></Link>
                </div>
            </div>
            <motion.img
                src={png2}
                
                className="w-20 absolute top-64 right-10"
                animate={{
                    rotate: [0, 360], // Rotates continuously
                    y: [0, -100,0, 100, 0], // Moves up and down
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
                            src={png1}
                            alt=""
                            className="w-32 absolute bottom-40 left-10"
                            animate={{
                                rotate: [0, 360], // Rotates continuously
                                y: [0, -100,0, 100, 0], // Moves up and down
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
            </div>
        </section>
    );
};

export default NewArrival;