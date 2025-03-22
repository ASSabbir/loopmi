import Banner from "./Banner";
import Blog from "./Blog";
import Categoris from "./Categoris";
import Discount from "./Discount";
import Features from "./Features";
import NewArrival from "./NewArrival";
import TopPerformance from "./TopPerformance";
import WhyChoose from "./WhyChoose";
import TrendingNow from "./TrendingNow";
import RecentArrivals from "./RecentArrivals";
import Recommended from "./Recommended";
import BestDeals from "./BestDeals";
import HomeSearch from "./HomeSearch";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HomeSearch></HomeSearch>
            <Categoris></Categoris>
            <TrendingNow></TrendingNow>
            <RecentArrivals></RecentArrivals>
            <NewArrival></NewArrival>
            <BestDeals></BestDeals>
            <Recommended></Recommended>
            <Features></Features>
            <WhyChoose></WhyChoose>
            <TopPerformance></TopPerformance>
            {/* <Blog></Blog> */}
            <Discount></Discount>
        </div>
    );
};

export default Home;