import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <img src="logo.png" alt="Globe Route Logo" />
        <p>GlobeRoute</p>
      </div>
      <div className="profile">
        {/* <img src="logo.png" alt="" /> */}
      </div>
    </nav>
  );
};

export default Navbar;
