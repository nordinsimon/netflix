import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import SearchBar from "./SearchBar";
import AllContext from "../src/context/context";

const Navbar = () => {
  const { logout } = useContext(AllContext);
  const [searching, setSearching] = useState(false);
  const [screen, setScreen] = useState(window.innerWidth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const isOnBookmarksPage = location.pathname === "/bookmark";
  const svgFill = isOnBookmarksPage ? "red" : "none";
  const svgStroke = isOnBookmarksPage ? "red" : "white";

  if (searching) {
    return <SearchBar setSearching={setSearching} />;
  }
  return (
    <div data-testid="nav" id="nav">
      <ul id="left">
        <li onClick={() => navigate("/")}>
          {screen < 420 ? <div id="homeCircle"></div> : "Home"}
        </li>
        <li onClick={() => navigate("/categories")}>
          {screen < 420 ? <div id="categoryCircle"></div> : "Category"}
        </li>
      </ul>
      <ul id="right">
        <li
          data-testid="bookmarkButton"
          id="bookmark"
          onClick={() => navigate("/bookmark")}
        >
          <div id="bookmarkcontainer">
            <svg
              id="lager-1"
              data-name="Lager 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 4.42 7.76"
              width="20"
              height="17"
            >
              <path
                className={isOnBookmarksPage ? "activeBookmark" : "cls-1"}
                fill={svgFill}
                stroke={svgStroke}
                d="m.28.27c1.3,0,2.59-.01,3.89-.02v6.88l-1.96-2.08L.25,7.13c0-2.29.02-4.57.03-6.86Z"
              ></path>{" "}
            </svg>
          </div>
        </li>
        <li data-testid="search" onClick={() => setSearching(true)}>
          <div id="circle"></div>
        </li>
        <li data-testid="logout" onClick={logout}>
          <div id="logoutCircle"></div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
