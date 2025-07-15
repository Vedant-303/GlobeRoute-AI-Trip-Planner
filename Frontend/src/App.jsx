import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticatePage from "./pages/Authentication/AuthenticatePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Route path="/" element={<AuthenticatePage />}></Route>
        <Route path="/home" element={<AuthenticatePage />}></Route>
        <Route path="/ai-trip" element={<AuthenticatePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
