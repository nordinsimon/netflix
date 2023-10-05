import { useContext, useState, useEffect } from "react";
import AllContext from "../../context/context";

import Navbar from "../../../components/Navbar";
import Slider from "../../../components/Slider";
import cateogoryIcon from "../../assets/icons8-menu-24.png";

import "./CategoriesPage.css";

const CategoriesPage = () => {
  const { movies } = useContext(AllContext);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const allGenres = movies.map((movie) => movie.genre);
  const genreWords = allGenres.flatMap((genreString) => genreString.split(","));
  const cleanedGenres = genreWords.map((genre) => genre.trim());
  const uniqueGenres = [...new Set(cleanedGenres)];
  const [width, setWidth] = useState(window.innerWidth);
  const [showGenres, setShowGenres] = useState(false);

  useEffect(() => {
    const updateScreenWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre.includes(selectedGenre))
    : movies;

  return (
    <div className="homepage">
      <Navbar />
      <h4>Categories</h4>
      {width < 1200 && (
        <img
          id="genreBtn"
          onClick={() => setShowGenres(!showGenres)}
          src={cateogoryIcon}
        ></img>
      )}
      <div className="categories">
        {width > 1200 && (
          <ul className="category">
            {uniqueGenres.map((genre, index) => (
              <li className="genres" key={index}>
                <button
                  className={genre === "Sci-Fi" ? "Sci-fiBtn" : "genre"}
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </button>
              </li>
            ))}
          </ul>
        )}
        {width < 1200 && (
          <ul className="categoryMobile">
            {showGenres &&
              uniqueGenres.map((genre, index) => (
                <li className="genresMobile" key={index}>
                  <button
                    className={genre === "Sci-Fi" ? "Sci-fiBtn" : "genre"}
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
      <h4>{selectedGenre ? `Movies in ${selectedGenre}` : "All Movies"}</h4>
      <Slider filmsToMap={filteredMovies} />
    </div>
  );
};

export default CategoriesPage;
