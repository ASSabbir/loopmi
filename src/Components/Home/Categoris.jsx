import { motion } from "framer-motion";

const Categoris = () => {
    const categories = [
        { name: "Home Decor", count: 23, icon: "https://i.ibb.co.com/1f18Wm5P/pngwing-com.png" },
        { name: "Fashion", count: 32, icon: "https://i.ibb.co.com/WvdxgbHJ/pngwing-com-1.png" },
        { name: "Home Essentials", count: 8, icon: "https://i.ibb.co.com/WRWHz7C/pngwing-com-3.png" },
        { name: "Accessories", count: 14, icon: "https://i.ibb.co.com/VpJ72KRg/pngwing-com-4.png" },
        { name: "Handmade Diaries", count: 15, icon: "https://i.ibb.co.com/zWK5Yz7t/pngwing-com-2.png" },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-6 p-6 py-44">
            {categories.map((category, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="bg-gradient-to-r from-color2 from-10% via-color4 via-30% to-color4 to-90%  p-[4px] rounded-xl"
                >
                    <div className="w-56 h-72 bg-white  rounded-xl flex flex-col items-center justify-center   border-color1 p-4 cursor-pointer">
                        <div className="bg-slate-200 mb-5 p-4 rounded-full"><img src={category.icon} alt={category.name} className="w-12 h-12" /></div>
                        <h3 className="text-lg text-center font-semibold mt-3">{category.name}</h3>
                        <p className="text-gray-500 text-sm">{category.count} Items</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Categoris;