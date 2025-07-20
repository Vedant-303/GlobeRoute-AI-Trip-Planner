import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import axios from "axios";
import "./Trip.css";

import Navbar from "../../components/Navbar/Navbar";
import TripNav from "../../components/TripNav/TripNav";

const Trip = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state?.trip;
  const [images, setImages] = useState([]);

  const tripRef = useRef();
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const downloadPDF = () => {
    const element = tripRef.current;

    const opt = {
      margin: 0.2,
      filename: `${trip.name}-trip-details.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    if (!trip) {
      navigate("/");
      return;
    }

    const fetchImages = async () => {
      try {
        const res = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: trip.location.city,
            per_page: 5,
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        });
        setImages(res.data.results);
      } catch (err) {
        console.error("Unsplash fetch error", err);
      }
    };

    fetchImages();
  }, [trip, navigate]);

  if (!trip) return null;

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
            />
            <div className="smallImageContainer">
              <img
                className="smallImage"
                src={images[1].urls.small}
                alt={images[1].alt_description}
              />
              <img
                className="smallImage"
                src={images[2].urls.small}
                alt={images[2].alt_description}
              />
            </div>
            <div className="smallImageContainer">
              <img
                className="smallImage"
                src={images[3].urls.small}
                alt={images[3].alt_description}
              />
              <img
                className="smallImage"
                src={images[0].urls.small}
                alt={images[0].alt_description}
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

export default Trip;
