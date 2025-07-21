import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import API from "../../utils/axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const placeHolder = "/userPicPlaceHolder.png";

  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.log("Not logged in");
        setUser(null);
      }
    };

    fetchUser();

    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout", {}, { withCredentials: true });
      toast.warn("You have been logged out!");
      setUser(null);
      navigate("/");
    } catch (err) {
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <nav>
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/logo.png" alt="Globe Route Logo" />
        <p>GlobeRoute</p>
      </div>

      {user ? (
        <div className="profile">
          <div className="intro">
            <p>Hello,</p>
            <p>{user.name}</p>
          </div>
          <div
            className="profileImg"
            onClick={() => setPopupOpen((prev) => !prev)}
          >
            <img src={user.image ? user.image : placeHolder} alt="Profile" />
            {popupOpen && (
              <div
                className={`popup-menu ${popupOpen ? "active" : ""}`}
                ref={popupRef}
              >
                <p onClick={() => (window.location.href = "/profile")}>
                  Profile
                </p>
                <p onClick={handleLogout}>Log out</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="profile">
          <button
            onClick={() => {
              window.location.href = "http://localhost:5173/auth";
            }}
            className="login-btn"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
