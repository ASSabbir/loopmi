
import { Link } from 'react-router-dom';
import './style.css'
const TopPerformance = () => {
    return (
        <div className="py-32 md:h-screen">
            <div className="relative h-full w-full bg-white">
                {/* Background */}
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] 
            [background-size:16px_16px] 
            [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] 
            z-0">
                </div>

                {/* Main Content */}
                <div className="max-w-screen-2xl h-full mx-auto flex flex-col md:flex-row relative z-10 ">
                    <div className="md:w-1/2 flex items-center justify-center">
                        <div className="relative grid grid-cols-2 gap-2 place-items-center ">
                            <div className=" flex justify-center items-center flex-col md:w-72 w-44 h-44 md:h-72 md:rounded-tr-[150px] md:rounded-bl-[150px] bg-color3">
                                <h1 className="font- text-lg">Total Customers</h1>
                                <h1 className="font-bold text-2xl">1000+</h1>
                            </div>
                            <div className="flex justify-center flex-col items-center md:w-72 w-44 h-44 md:h-72 md:rounded-tl-[150px] md:rounded-br-[150px] bg-color4">
                                <h1 className="font- text-lg">Total Sellers</h1>
                                <h1 className="font-bold text-2xl">500+</h1>
                            </div>
                            <div className="md:w-72 w-44 h-44 flex justify-center flex-col items-center md:h-72 md:rounded-tl-[150px] md:rounded-br-[150px] bg-color5">
                                <h1 className="font- text-lg">Total Products</h1>
                                <h1 className="font-bold text-2xl">5000+</h1>
                            </div>
                            <div className="md:w-72 w-44 h-44 flex justify-center flex-col items-center md:h-72 md:rounded-tr-[150px] md:rounded-bl-[150px] bg-color2">
                                <h1 className="font- text-lg">Avarage Rating</h1>
                                <h1 className="font-bold text-2xl">4.8</h1>
                            </div>
                            <div className="rotate-infinite border-4  absolute flex items-center justify-center w-40 h-40 rounded-full bg-white bg-opacity-30 backdrop-blur-lg backdrop-filter  border-white border-opacity-20 shadow-lg">
                                
                                <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                                    <path
                                        id="circlePath"
                                        d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                                        fill="transparent"
                                    />
                                    <text fontSize="10" fill="black">
                                        <textPath href="#circlePath" className='' startOffset="25%">
                                            Our Top Performance
                                        </textPath>
                                    </text>
                                </svg>

                                {/* Center Icon */}
                                <div className="flex items-center justify-center w-10 h-10 bg-color6 rounded-full">
                                    <span className="text-white text-xl"></span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="md:w-1/2 flex justify-center flex-col h-full md:pl-24 ">
                        <h1 className="text-4xl md:text-5xl font-bold mb-7 ">Top Performance</h1>
                        <h1 className="w-[70%] leading-8 text-xl text-gray-500">Every month, we handpick the best eco-friendly products just for you. Explore this month’s top sustainable picks, curated by our experts!</h1>
                        <div className=' flex justify-start  w-full mt-10'>
                            <Link id='button' className='px-7 py-4  rounded-full text-white' to={'/shop'}><button>View All items</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopPerformance;