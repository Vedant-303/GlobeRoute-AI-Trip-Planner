import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticatePage from "./pages/Authentication/AuthenticatePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/Landing/LandingPage";

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
        <Route path="/auth" element={<AuthenticatePage />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/ai-trip" element={<AuthenticatePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
