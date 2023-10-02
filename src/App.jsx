import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import BookmarkPage from "./pages/bookmark/BookmarkPage";
import FilmViewPage from "./pages/filmView/FilmViewPage";
import authToken from "./auth/authToken";

// import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirectIfNotAuthenticated = () => {
      const result = authToken();
      console.log("result", result);

      if (result !== true) {
        navigate("/login");
      } else if (result === true && location.pathname === "/login") {
        navigate("/");
      }
    };
    redirectIfNotAuthenticated();
  }, [navigate, location.pathname]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/categories" element={<CategoriesPage />}></Route>
        <Route path="/bookmark" element={<BookmarkPage />}></Route>
        <Route path="/filmView" element={<FilmViewPage />}></Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
