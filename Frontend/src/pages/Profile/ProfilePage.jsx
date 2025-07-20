import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TripCard from "../../components/TripCard/TripCard";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser?._id) return;

      try {
        const res = await fetch(
          `http://localhost:3000/api/trip/user-trips/${storedUser._id}`
        );
        const data = await res.json();
        if (data.success) {
          setTrips(data.trips);
        }
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <>
      <Navbar />
      <div className="profilePage">
        <div className="profileTop">
          <div className="profileTopInfo">
            <p className="main">Trips</p>
            <p className="support">View Your AI Travel Plans</p>
          </div>
          <button
            className="createTripBtn"
            onClick={() => (window.location.href = "/")}
          >
            Create Trip
          </button>
        </div>
        <div className="trips">
          {trips.length > 0 ? (
            trips.map((trip, idx) => <TripCard key={idx} trip={trip} />)
          ) : (
            <p>No trips found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
