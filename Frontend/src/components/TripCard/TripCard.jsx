import "./TripCard.css";

const TripCard = ({ trip }) => {
  return (
    <>
      <div className="tripCard">
        <div className="tripImg"></div>
        <div className="tripInfo">
          <div className="tripinfoTop">
            <p className="tripTitle">
              {trip?.location?.city || "Unknown City"}
            </p>
            <p className="tripPrice">{trip?.estimatedPrice || "Rs. --"}</p>
          </div>
          <div className="tripDescription">
            <p>{trip?.description || "No description available."}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripCard;
