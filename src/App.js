import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hashtags from "./pages/hashtags/index.js";
import Timeline from "./pages/timeline";
import UserPage from "./pages/user/UserPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<h1>Registrar-se</h1>} />
        <Route path="/" element={<h1>Login</h1>} />
        <Route path="/timeline" element={<Timeline/>} />
        <Route path="/user/:id" element={<UserPage></UserPage>} />
        <Route path="/hashtag/:hashtag" element={<Hashtags/>} />
      </Routes>
    </BrowserRouter>
  )
}