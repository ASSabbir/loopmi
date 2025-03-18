

const Discount = () => {
    return (
        <div className='max-w-screen-xl mb-44 mx-auto gap-5 flex flex-col'>
            <div className='flex flex-col md:flex-row gap-5'>
                <div className='md:w-1/2 rounded-2xl h-80 p-16 flex justify-center flex-col space-y-5 bg-[#F3EBFF]'>
                    <h1 className='text-4xl font-bold'>Earn 75% of the ItemD Price</h1>
                    <p>Sellers receive 75% of the Itemp Price for items Dsold exclusively and 50% for items sold non-exclusively. See detailed informationabout the fee structure on Market.</p>
                    <button className='border-2 w-52 p-3  border-zinc-700 hover:bg-zinc-700 hover:text-white duration-150  rounded-full'>Become A Seller</button>
                </div>
                <div className='md:w-1/2 rounded-2xl h-80 p-16 flex justify-center flex-col space-y-5 bg-[#FFCBE7]'>
                    <h1 className='text-4xl font-bold'>Earn until 40% commission</h1>
                    <p>Our Market is the world’s largest creative market place, selling millions of digital assets every year. With 30% affiliate commission, earning money has never been easier!</p>
                    <button className='border-2 w-52 p-3  border-zinc-700 hover:bg-zinc-700 hover:text-white duration-150  rounded-full'>Become An Affiliate</button>
                </div>
            </div>
            <div className=' rounded-2xl w-full p-5 flex justify-between  space-y-5 bg-[#FFEFF4]'>
                <div className='relative z-10 mx-auto'>
                    <img src="https://dpmarketwp.wowtheme7.com/wp-content/uploads/2024/05/support-img.png" alt="" className='w-56 ' />
                    
                </div>
                
                <div id="card" className='md:w-1/2 z-20 space-y-5 flex justify-center flex-col'>
                    <h1 className='text-4xl font-bold'>Support 24/7</h1>
                    <p>Wanna talk? Send us a message</p>
                    <button className='border-2 w-52 p-3  hover:border-zinc-700 bg-zinc-700 text-white duration-150 hover:bg-transparent hover:text-zinc-700 rounded-full'>infomail@office.com</button>
                    
                </div>
            </div>
        </div>
    );
};

export default Discount;