import { Link } from "react-router-dom";
import useItem from "../Root/useItem";


const Features = () => {
    const [items] = useItem()
    return (
        <div className="py-32 md:min-h-screen bg-white">
            <div className="relative h-full w-full max-w-7xl mx-auto container">
                {/* Background */}
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] 
            [background-size:16px_16px] 
            [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] 
            z-0">
                </div>

                {/* Main Content */}
                <div className="max-w-screen-2xl h-full mx-auto flex md:flex-row flex-col-reverse relative z-10 ">
                    <div className="md:w-1/2 grid md:grid-cols-2 gap-5 items-center  self-center">
                        {items?.slice(0, 4).map((item, index) => (
                            <div
                                key={index}
                                className="card  glass w- cursor-pointer">
                                <figure className='h-40'>
                                    <img
                                        src={item.photo}
                                        alt={item.title}
                                        className='object-cover '
                                    />
                                </figure>
                                <div className="p-5">
                                    <h2 className="font-bold font-Open_Sans">{item.title || "Default Title"}</h2>
                                    <div className='flex justify-between mt-3'>
                                        <h1>by {item.vendorUsername}</h1>
                                        <h1 className='font-semibold'>${item.price}</h1>

                                    </div>
                                    <div className="divider"></div>
                                    <h1>Category : {item.category}</h1>
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
                            </div>
                        ))}
                    </div>
                    <div  className="md:w-1/2 w-full flex justify-center flex-col h-full py-4 md:pl-24  ">
                        <h1 className="text-5xl font-bold mb-7  md:text-start ">Featured Products</h1>
                        <h1 className="w-[70%]  leading-8 text-xl text-gray-500">Every month, we handpick the best eco-friendly products just for you. Explore this month’s top sustainable picks, curated by our experts!</h1>
                        <div className=' flex justify-start  w-full mt-10'>
                            <Link id='button' className='px-7 py-4  rounded-full text-white' to={'/shop'}><button>View All items</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Features;