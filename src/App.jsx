import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Banner from "./modules/home/Banner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieLayout from "./layouts/movie/MovieLayout";
import Home from "./modules/home";
import NotFound from "./modules/NotFound";
import Login from "./modules/Login";
import SignUp from "./modules/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieLayout />}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        </Route>

        {/* Not found */}
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
