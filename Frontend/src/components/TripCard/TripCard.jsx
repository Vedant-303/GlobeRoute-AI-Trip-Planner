import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./TripCard.css";

const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  const city = trip?.location?.city || "travel";
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const fetchUnsplashImage = async (query) => {
    try {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      return data?.results?.[0]?.urls?.regular || null;
    } catch (err) {
      console.error("Error fetching image from Unsplash:", err);
      return null;
    }
  };

  const handleClick = () => {
    navigate(`/trip/${trip._id}`);
  };

  useEffect(() => {
    const loadImage = async () => {
      const url = await fetchUnsplashImage(city);
      setImageUrl(url);
    };
    loadImage();
  }, [city]);

  return (
    <div className="tripCard" onClick={handleClick}>
      <div className="tripImg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={city}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
      <div className="tripInfo">
        <div className="tripinfoTop">
          <p className="tripTitle">{city}</p>
          <p className="tripPrice">{trip?.estimatedPrice || "Rs. --"}</p>
        </div>
        <div className="tripDescription">
          <p>
            {trip?.description
              ? `${trip.description.slice(0, 140)}${
                  trip.description.length > 140 ? "..." : ""
                }`
              : "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
