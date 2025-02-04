import { CiSearch } from 'react-icons/ci';
import './style.css'
import img1 from '../../assets/4.jpg'
import img2 from '../../assets/3.jpg'
import img3 from '../../assets/6.jpg'
import { motion } from 'motion/react';

const Banner = () => {
    return (
        <section className="text-gray-800   relative overflow-hidden">
            {/* Background Gradient Blur Divs */}
            <div className="absolute inset-0 flex justify-center">
                <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute right-20 top-1/2 -z-10"></div>
                <div className='bg-color1 h-screen w-full opacity-30'></div>
                <div className="w-[100px] h-[200px] bg-color3 blur-[50px] rounded-full absolute right-20 top-32 -z-10"></div>
                <div className="w-[450px] h-[300px] bg-color3 blur-[100px] rounded-full absolute left-2
         bottom-64 -z-10"></div>
            </div>

            {/* Main Content */}
            <div className="max-w-screen-2xl relative z-10 flex flex-col h-screen justify-center items-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                <div className="w-1/2">
                    <h1 className="text-5xl font-bold sm:text-7xl">
                        Shop Recycled Products For a Greener Tomorrow
                    </h1>
                    <p className="mt-6 mb-8 text-lg sm:mb-12 ">
                        Explore a wide range of recycled products and shop sustainably. Give new life to pre-loved items while supporting a greener future.
                    </p>
                    <div className="relative flex items-center">
                        <input type="text" placeholder="Search here" className="input w-full rounded-full max-w-xl px-6 h-16 border-[2px] border-zinc-100" />
                        <button id="button" className="duration-150 right-14 p-3 text-white text-2xl rounded-full relative"><CiSearch /></button>
                    </div>
                </div>
                <div className=" relative w-1/2  h-full items-center gap-2   grid grid-cols-2">
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
                </div>
            </div>
        </section>

    );
};

export default Banner;