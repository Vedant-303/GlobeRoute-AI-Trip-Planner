import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "./TripForm.css";

const TripForm = () => {

  const navigate = useNavigate();

  const currentDate = new Date();
  const date = currentDate.getDate();
  let month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  if (month < 10) {
    month = `0${month + 1}`;
  }

  const today = `${year}-${month}-${date}`;

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    fromDate: "",
    toDate: "",
    people: 1,
    group: "solo",
    budget: "cheap",
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const formHandler = async (event) => {
    event.preventDefault();

    try {
      const authRes = await fetch("http://localhost:3000/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (!authRes.ok) {
        toast.warn("Please Login First");
        navigate("/auth", { replace: true });
        return;
      }

      navigate("/loading", { replace: true });

      const response = await fetch("http://localhost:3000/api/trip/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      navigate("/trip", { state: { trip: data.trip } });
    } catch (error) {
      console.error("Error generating itinerary:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <form className="tripForm" onSubmit={formHandler}>
      <p className="formHeading">Let AI Create your Trip</p>
      <div className="formElement">
        <label htmlFor="origin">Origin</label>
        <input
          type="text"
          name="origin"
          id="origin"
          placeholder="Pune, Maharashtra"
          onChange={changeHandler}
          required
        />
      </div>

      <div className="formElement">
        <label htmlFor="destination">Destination</label>
        <input
          type="text"
          name="destination"
          id="destination"
          placeholder="Goa"
          onChange={changeHandler}
          required
        />
      </div>

      <div className="formElement">
        <label htmlFor="fromDate">Date</label>
        <div className="dateWrapper">
          <input
            type="date"
            name="fromDate"
            id="fromDate"
            onChange={changeHandler}
            min={today}
            required
          />
          <p>to</p>
          <input
            type="date"
            name="toDate"
            id="toDate"
            onChange={changeHandler}
            min={formData.fromDate || today}
            required
          />
        </div>
      </div>

      <div className="formElement">
        <label htmlFor="people">People's</label>
        <input
          type="number"
          name="people"
          id="people"
          placeholder="1"
          min={1}
          onChange={changeHandler}
          required
        />
      </div>

      <div className="formElement">
        <label htmlFor="group">Group Type</label>
        <select name="group" id="group" required onChange={changeHandler}>
          <option value="">Select Group Type</option>

          <option value="solo" id="group" onChange={changeHandler}>
            Solo
          </option>
          <option value="couple" id="group" onChange={changeHandler}>
            Couple
          </option>
          <option value="family" id="group" onChange={changeHandler}>
            Family
          </option>
          <option value="friends" id="group" onChange={changeHandler}>
            Friends
          </option>
        </select>
      </div>

      <div className="formElement">
        <label htmlFor="budget">Budget</label>
        <select name="budget" id="budget" required onChange={changeHandler}>
          <option value="">Select Budget</option>
          <option value="cheap" id="budget" onChange={changeHandler}>
            Cheap
          </option>
          <option value="mid-range" id="budget" onChange={changeHandler}>
            Mid-Range
          </option>
          <option value="expensive" id="budget" onChange={changeHandler}>
            Expensive
          </option>
        </select>
      </div>

      <input className="submitBtn" type="submit" value="Submit" />
    </form>
  );
};

export default TripForm;
