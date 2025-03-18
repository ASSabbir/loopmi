

const WhyChoose = () => {
    return (
        <div className=" w-full">
            <div className="relative h-full w-full bg-slate-900  text-white ">
                {/* Background Grid Effect */}
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>


                {/* Text Content Inside the Background */}
                <div  className="relative  w-full z-10 max-w-screen-2xl mx-auto py-44 p-8 bg-opacity-30 backdrop-blur-md rounded-lg">
                    <h1 className="text-5xl font-bold  mb-12">Why Choose Us? </h1>
                    <p className="mt-4 text-xl font-Open_Sans">
                        We’re more than just a marketplace—we’re a movement toward a greener future.
                        Our carefully curated products blend sustainability, innovation, and style, ensuring every purchase makes a positive impact.
                        Shop with confidence, knowing you’re choosing quality, eco-friendly materials, and a brand committed to a better tomorrow. 🌱✨
                    </p>
                </div>
            </div>
        </div>

    );
};

export default WhyChoose;