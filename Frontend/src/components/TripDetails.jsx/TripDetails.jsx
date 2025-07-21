import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchUnsplashImages } from "../../utils/unsplash";
import html2pdf from "html2pdf.js";
import Navbar from "../Navbar/Navbar";
import TripNav from "../../components/TripNav/TripNav";

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const tripRef = useRef();

  const downloadPDF = () => {
      const element = tripRef.current;
  
      const opt = {
        margin: 0.2,
        filename: `${trip.name}-trip-details.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1.5 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
  
      html2pdf().set(opt).from(element).save();
    };

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/trip/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setTrip(data.trip);
        } else {
          console.error("Failed to load trip details");
        }
      } catch (err) {
        console.error("Error fetching trip:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  const [images, setImages] = useState([]);

useEffect(() => {
  if (!trip || !trip.location?.city) return;

  const fetchImages = async () => {
    const imageResults = await fetchUnsplashImages(trip.location.city);
    setImages(imageResults);
  };

  fetchImages();
}, [trip]);

  if (loading) return <p>Loading trip...</p>;
  if (!trip) return <p>Trip not found</p>;

  return (
    <>
      <Navbar />
      <TripNav onDownload={downloadPDF}/>

      <div ref={tripRef} className="tripDetails">
        <p className="tripTitle">{trip.name}</p>
        <div className="durationNLocation">
          <p>🗓️ {trip.duration} plan</p>
          <p>📍{trip.location.city}</p>
        </div>
        {images.length === 5 && (
          <div className="imageWrapper">
            <img
              className="bigImage"
              src={images[4].urls.small}
              alt={images[4].alt_description}
              crossOrigin="anonymous"
            />
            <div className="smallImageContainer">
              <img
                className="smallImage"
                src={images[1].urls.small}
                alt={images[1].alt_description}
                crossOrigin="anonymous"
              />
              <img
                className="smallImage"
                src={images[2].urls.small}
                alt={images[2].alt_description}
                crossOrigin="anonymous"
              />
            </div>
            <div className="smallImageContainer">
              <img
                className="smallImage"
                src={images[3].urls.small}
                alt={images[3].alt_description}
                crossOrigin="anonymous"
              />
              <img
                className="smallImage"
                src={images[0].urls.small}
                alt={images[0].alt_description}
                crossOrigin="anonymous"
              />
            </div>
          </div>
        )}
        <div className="tagNPrice">
          <div className="tagWrapper">
            <span className="tag">{trip.group}</span>
            <span className="tag">{trip.people} People</span>
            <span className="tag">{trip.budget}</span>
          </div>
          <span className="price">{trip.estimatedPrice}</span>
        </div>
        <p className="tripDescription">{trip.description}</p>
        <p></p>
        <p className="weatherTitle">🌦️ Weather</p>
        {trip.currentweatherInfo.map((info, idx) => (
          <p className="text" key={idx}>
            {info}
          </p>
        ))}
        <p className="threatTitle">⚠️ Threat Analysis</p>
        {trip.threatAnalysis.map((threat, idx) => (
          <p className="text" key={idx}>
            {threat}
          </p>
        ))}
        <p className="transportTitle">🚏 How To Reach</p>
        {trip.howToReach.map((transport, idx) => (
          <p className="text" key={idx}>
            {transport}
          </p>
        ))}
        <p className="accomodationTitle">🏘️ Accomodations</p>
        {trip.accomodations.map((accomodation, idx) => (
          <p className="text" key={idx}>
            {accomodation}
          </p>
        ))}
        <p className="cuisineTitle">🍽️ Must Try Local Cuisine</p>
        {trip.localCuisine.map((cuisine, idx) => (
          <p className="text" key={idx}>
            {cuisine}
          </p>
        ))}
        <p className="localTransport">🛺 Local Transport</p>
        {trip.localTransport.map((localTransport, idx) => (
          <p className="text" key={idx}>
            {localTransport}
          </p>
        ))}
        <p className="itineraryTitle">📅 Itinerary</p>
        {trip.itinerary.map((day, index) => (
          <div key={index}>
            <p className="day">
              Day {day.day} - {day.location}
            </p>
            {day.activities.map((activity, idx) => (
              <p className="text" key={idx}>
                <strong>{activity.time}:</strong> {activity.description}
              </p>
            ))}
          </div>
        ))}
        <p className="emergencyTitle">📢 Emergency Info & Helplines</p>
        {trip.EmergencyInfoHelplines.map((item, index) => (
          <div key={index}>
            {item.EmergencyHelplines && (
              <p className="text">
                <strong>Emergency Helplines:</strong> {item.EmergencyHelplines}
              </p>
            )}
            {item.Embassy && (
              <p className="text">
                <strong>Embassy Info:</strong> {item.Embassy}
              </p>
            )}
          </div>
        ))}

        <p className="localLanguageSlangs">
          📜 Some Sentences in Local Language
        </p>
        {trip.localLanguageSentence.map((localSlangs, idx) => (
          <p className="text" key={idx}>
            {localSlangs}
          </p>
        ))}
      </div>
    </>
  );
};

export default TripDetails;
