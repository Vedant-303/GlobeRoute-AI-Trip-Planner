import "./TripNav.css";

const TripNav = ({ onDownload }) => {
  return (
    <div className="tripNav">
      <div className="info">
        <p className="main">AI Genarated Trip</p>
        <p></p>
      </div>
      <button className="downloadBtn" onClick={onDownload}>
        Download Details
      </button>
    </div>
  );
};

export default TripNav;
