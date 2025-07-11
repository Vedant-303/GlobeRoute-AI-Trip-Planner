import { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({onFlip}) => {
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
    <div className="loginForm">
      <p className="main">Start Your Travel Journey</p>
      <p>
        Login to explore AI-generated <br /> itineraries, trending destinations,
        and much more
      </p>
      <form onSubmit={formHandler}>
        <div className="emailWrapper">
          <label htmlFor="loginEmail">Email</label>
          <br />
          <input
            id="loginEmail"
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="passwordWrapper">
          <label htmlFor="loginPassword">Password</label>
          <br />
          <input
            id="loginPassword"
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={changeHandler}
            required
          />
        </div>
        <button className="primaryBtn" type="submit">
          Login
        </button>
      </form>
      <hr />
      <p className="support">or</p>
      <button className="googleAuth" type="button">
        <img src="google-logo.svg" alt="Google logo" />
        <p>Login with Google</p>
      </button>
      <p>Don't have an account? <span className="signupLink" onClick={onFlip}>Sign up</span></p>
    </div>
  );
};

export default LoginForm;
