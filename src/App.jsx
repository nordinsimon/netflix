import { Routes, Route } from "react-router-dom";
//import { useEffect, useState, useContext } from "react";

import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import BookmarkPage from "./pages/bookmark/BookmarkPage";
import FilmViewPage from "./pages/filmView/FilmViewPage";

// import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/categories" element={<CategoriesPage />}></Route>
        <Route path="/bookmark" element={<BookmarkPage />}></Route>
        <Route path="/filmView" element={<FilmViewPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
