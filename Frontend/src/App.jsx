import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticatePage from "./pages/Authentication/AuthenticatePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticatePage />}></Route>
        <Route path="/home" element={<AuthenticatePage />}></Route>
        <Route path="/ai-trip" element={<AuthenticatePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
