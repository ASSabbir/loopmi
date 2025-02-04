
import Banner from "./Banner";
import Categoris from "./Categoris";
import Discount from "./Discount";
import Features from "./Features";

import NewArrival from "./NewArrival";
import TopPerformance from "./TopPerformance";
import WhyChoose from "./WhyChoose";

const Home = () => {
    
    
    return (
        <div>
            <Banner></Banner>
            <Categoris></Categoris>
            <NewArrival></NewArrival>
            <Features></Features>
            <WhyChoose></WhyChoose>
            <TopPerformance></TopPerformance>
            <Discount></Discount>
        </div>
    );
};

export default Home;