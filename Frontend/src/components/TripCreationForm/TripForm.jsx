import { useState } from "react";
import "./TripForm.css";

const TripForm = () => {
  const currentDate = new Date();
  const date = currentDate.getDate();
  let month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  if (month < 10) {
    month = `0${month + 1}`;
  }

  const today = `${year}-${month}-${date}`;

  const [formData, setFormData] = useState({});

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((values) => ({ ...values, [name]: value }));
  };

  const formHandler = (event) => {
    event.preventDefault();
    console.log(formData);
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
          placeholder="Origin"
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
          placeholder="Destination"
          onChange={changeHandler}
          required
        />
      </div>

      <div className="formElement">
        <label htmlFor="date">Date</label>
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

          <option value="solo" defaultChecked onChange={changeHandler}>
            Solo
          </option>
          <option value="couple" onChange={changeHandler}>
            Couple
          </option>
          <option value="family" onChange={changeHandler}>
            Family
          </option>
          <option value="friends" onChange={changeHandler}>
            Friends
          </option>
        </select>
      </div>

      <div className="formElement">
        <label htmlFor="budget">Budget</label>
        <select name="budget" id="budget" required onChange={changeHandler}>
          <option value="">Select Budget</option>
          <option value="cheap" onChange={changeHandler}>
            Cheap
          </option>
          <option value="mid-range" onChange={changeHandler}>
            Mid-Range
          </option>
          <option value="expensive" onChange={changeHandler}>
            Expensive
          </option>
        </select>
      </div>

      <input className="submitBtn" type="submit" value="Submit" />
    </form>
  );
};

export default TripForm;
