import Extra from "../../components/ExtraInfo/Extra";
import Hero from "../../components/HeroSection/Hero";
import Navbar from "../../components/Navbar/Navbar";

const LandingPage = () => {
  return (
    <div className="landing">
      <Navbar />
      <Hero />
      <Extra />
    </div>
  );
};

export default LandingPage;
