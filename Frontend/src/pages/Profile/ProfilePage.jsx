import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TripCard from "../../components/TripCard/TripCard";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const userRes = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });

        const userData = await userRes.json();

        if (!userData?._id) {
          console.warn("User not authenticated or ID missing");
          return;
        }

        const tripsRes = await fetch(
          `http://localhost:3000/api/trip/user-trips/${userData._id}`,
          {
            credentials: "include",
          }
        );

        const tripsData = await tripsRes.json();

        if (tripsData.success) {
          setTrips(tripsData.trips);
        } else {
          console.error("Failed to fetch trips:", tripsData.message);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
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
