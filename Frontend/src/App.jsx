import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticatePage from "./pages/Authentication/AuthenticatePage";
import LandingPage from "./pages/Landing/LandingPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Trip from "./pages/AIGenTrip/Trip";
import Spinner from "./components/Spinner/Spinner";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        newestOnTop
      />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/auth" element={<AuthenticatePage />}></Route>
        <Route path="/trip" element={<Trip />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/loading" element={<Spinner />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
