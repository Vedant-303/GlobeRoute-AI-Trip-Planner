import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const placeHolder = "userPicPlaceHolder.png";

  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.warn("You have been logged out!");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <nav>
      <div className="logo" onClick={() => (window.location.href = "/")}>
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
            <img src={user.image || placeHolder} alt="Profile" />
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
