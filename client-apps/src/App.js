import { Route, Routes } from "react-router-dom";
import "./App.css";
import ListUsers from "./components/ListUsers/ListUsers";
import Login from "./components/Login Form/LoginForm";
import Update from "./components/Profile Update/ProfileUpdate";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/users/:id" element={<Update />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
