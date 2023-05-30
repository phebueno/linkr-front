import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./pages/timeline";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<h1>Registrar-se</h1>} />
        <Route path="/" element={<h1>Login</h1>} />
        <Route path="/timeline" element={<Timeline/>} />
        <Route path="/user/:id" element={<h1>Posts do usuário</h1>} />
        <Route path="/hashtag/:hashtag" element={<h1>Posts por hashtags</h1>} />
      </Routes>
    </BrowserRouter>
  )
}