
import useItem from '../Root/useItem';

const NewArrival = () => {
    const [items] = useItem()
    
    return (
        <section className="text-gray-800   relative overflow-hidden">
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
                <div className='grid grid-cols-4 gap-5'>
                    {items?.slice(0, 8).map((item, index) => (
                        <div
                            key={index}
                             className="card glass w- cursor-pointer">
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
            </div>
        </section>
    );
};

export default NewArrival;