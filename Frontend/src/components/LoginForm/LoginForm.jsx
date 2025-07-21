import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import API from "../../utils/axios";
import { toast } from "react-toastify";

const LoginForm = ({ onFlip }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((values) => ({ ...values, [name]: value }));
  };

  const formHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await API.post("/auth/login", data, {
        withCredentials: true,
      });
  
      toast.success("Login successful! Redirecting.");

      localStorage.setItem("user", JSON.stringify(response.data.user));

      setTimeout(() => {
        navigator("/");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
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
        <button className="primaryBtn" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Login"}
        </button>
      </form>
      <hr />
      <p className="footer">
        Don't have an account?{" "}
        <span className="signupLink" onClick={onFlip}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
