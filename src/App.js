import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Recipe from "./Components/Recipe";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Joke from "./Pages/Joke";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile";
import { useEffect, useState } from "react";
import Create from "./Pages/Create";

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenExtracting = () => {
      setToken(localStorage.getItem('token'));
    }
    tokenExtracting();
  }, []);

  return (
    <div className="App px-10 bg-[#F5E8D2]">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {
          token ? 
          <>
            <Route path="/login" element={<Joke />} />
            <Route path="/register" element={<Joke />} />
          </>
          :
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        }
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
