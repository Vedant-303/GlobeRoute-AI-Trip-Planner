import Navbar from "../Navbar/Navbar";
import TripNav from "../TripNav/TripNav";
import "./Spinner.css";

const Spinner = () => (
  <>
    <Navbar />
    <TripNav />
    <div className="centerSpinner">
      <div className="spinner"></div>
      <p>Generating your Trip...</p>
    </div>
  </>
);

export default Spinner;
