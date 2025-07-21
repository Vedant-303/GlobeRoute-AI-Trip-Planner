import { useState } from "react";
import "./SignupForm.css";
import API from "../../utils/axios";
import { toast } from "react-toastify";

const SignupForm = ({ onFlip }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((values) => ({ ...values, [name]: value }));
  };

  const formHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await API.post("/auth/signup", data, {
        withCredentials: true,
      });
      toast.success("Signup successful! Please log in.");
      setTimeout(() => onFlip(), 1000);
    } catch (err) {
      console.error(
        "Signup error:",
        err.response?.data?.message || err.message
      );
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupForm">
      <p className="main">Start Your Travel Journey</p>
      <p>
        Sign up to explore AI-generated <br /> itineraries, trending
        destinations, and much more
      </p>
      <form onSubmit={formHandler} method="POST">
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
            type="email"
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
        <button className="primaryBtn" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Sign Up"}
        </button>
      </form>
      <hr />
      <p className="footer">
        Have an account?{" "}
        <span className="loginLink" onClick={onFlip}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupForm;
