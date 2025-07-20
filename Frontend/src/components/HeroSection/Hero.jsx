import TripForm from "../TripCreationForm/TripForm";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="info">
        <p className="heading">
          Plan Smarter, <br />
          Travel Farther.
        </p>
        <p className="subHeading">
          GlobeRoute uses AI to craft your perfect trip - from transport and
          stays to food and must visit spots - all tailored to your
          budget and time.
        </p>
      </div>

      <TripForm />
    </div>
  );
};

export default Hero;
