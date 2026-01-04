import BestWorkers from "../components/Home/BestWorkers";
import ExtraSections from "../components/Home/ExtraSections";
import Hero from "../components/Home/Hero";
import Testimonials from "../components/Home/Testimonials";
import TrustStats from "../components/Home/TrustStats";
import HomeCTA from "../components/Home/HomeCTA";

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <BestWorkers></BestWorkers>
            <ExtraSections></ExtraSections>
            <Testimonials></Testimonials>
            <TrustStats></TrustStats>
            <HomeCTA></HomeCTA>
        </div>
    );
};

export default Home;
