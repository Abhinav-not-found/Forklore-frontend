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
import ProfilePage from "./Pages/ProfilePage";
import EditPage from "./Components/EditPage";
import AllRecipe from "./Pages/AllRecipe";
import MyRecipe from "./Pages/MyRecipe";

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
        <Route path="/recipe/:recipeId" element={<Recipe />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profilePage/:id" element={<ProfilePage />} />
        <Route path="/edit/:recipeId" element={<EditPage/>}/>
        <Route path="/allRecipe" element={<AllRecipe/>}/>
        <Route path="/myRecipe" element={<MyRecipe/>}/>
      </Routes>
    </div>
  );
}

export default App;
