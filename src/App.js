import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hashtags from "./pages/hashtags/index.js";
import Timeline from "./pages/timeline";
import SignUp from "./pages/login/SignUp.js";
import SignIn from "./pages/login/SignIn.js";
import UserPage from "./pages/user/index.js";
import AuthContext from "./contexts/AuthContext.js";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userAuthData, setUserAuthData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  return (
    <AuthContext.Provider
      value={{ token, setToken, userAuthData, setUserAuthData }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/user/:id" element={<UserPage></UserPage>} />
          <Route path="/hashtag/:hashtag" element={<Hashtags />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
