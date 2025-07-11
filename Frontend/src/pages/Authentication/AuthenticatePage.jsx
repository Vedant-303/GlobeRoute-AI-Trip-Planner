import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import "./AuthenticatePage.css";

const AuthenticatePage = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="loginWrapper">
      <div className={`loginSignupCard ${isFlipped ? "flipped" : ""}`}>
        <LoginForm onFlip={() => setIsFlipped(true)} />
        <SignupForm onFlip={() => setIsFlipped(false)} />
      </div>
    </div>
  );
};

export default AuthenticatePage;
