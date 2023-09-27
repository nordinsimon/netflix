import { useContext, useState } from "react";
import AllContext from "../../context/context";
import moviesData from "../../../movies.json";
import "./CategoriesPage.css";

const CategoriesPage = () => {
  const [bookmarks, setBookmarks, movies] = useContext(AllContext);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const allGenres = moviesData.map((movie) => movie.genre);
  const genreWords = allGenres.flatMap((genreString) => genreString.split(","));
  const cleanedGenres = genreWords.map((genre) => genre.trim());
  const uniqueGenres = [...new Set(cleanedGenres)];
  console.log("unika genrer:", uniqueGenres);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre.includes(selectedGenre))
    : movies;

  return (
    <div>
      <h1>Categories</h1>
      <div className="carousel-container">
        <ul className="carousel">
          {uniqueGenres.map((genre, index) => (
            <li key={index} className="carousel-item">
              <button onClick={() => handleGenreClick(genre)}>{genre}</button>
            </li>
          ))}
        </ul>
      </div>
      <h2>{selectedGenre ? `Movies in ${selectedGenre}` : "All Movies"}</h2>
      <ul>
        {filteredMovies.map((movie, index) => (
          <li key={index}>
            <img src={movie.thumbnail} alt={movie.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
