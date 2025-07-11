import { useState } from "react";
import "./SignupForm.css";

const SignupForm = ({onFlip}) => {
  const [data, setData] = useState({});

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((values) => ({ ...values, [name]: value }));
  };

  const formHandler = (event) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <div className="signupForm">
      <p className="main">Start Your Travel Journey</p>
      <p>
        Sign up to explore AI-generated <br /> itineraries, trending
        destinations, and much more
      </p>
      <form onSubmit={formHandler}>
        <div className="nameWrapper">
          <label htmlFor="name">Name</label>
          <br />
          <input
            id="name"
            type="text"
            placeholder="Enter Name"
            name="name"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="emailWrapper">
          <label htmlFor="signUpEmail">Email</label>
          <br />
          <input
            id="signUpEmail"
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="passwordWrapper">
          <label htmlFor="signUpPassword">Password</label>
          <br />
          <input
            id="signUpPassword"
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={changeHandler}
            required
          />
        </div>
        <button className="primaryBtn" type="submit">
          Sign Up
        </button>
      </form>
      <hr />
      <p className="support">or</p>
      <button className="googleAuth" type="button">
        <img src="google-logo.svg" alt="Google logo" />
        <p>Sign up with Google</p>
      </button>
      <p>
        Have an account? <span className="loginLink" onClick={onFlip}>Login</span>
      </p>
    </div>
  );
};

export default SignupForm;
