import { useContext, useState } from "react";
import AllContext from "../../context/context";

import Navbar from "../../../components/Navbar";
import Slider from "../../../components/Slider";

import "./CategoriesPage.css";

const CategoriesPage = () => {
  const { movies } = useContext(AllContext);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const allGenres = movies.map((movie) => movie.genre);
  const genreWords = allGenres.flatMap((genreString) => genreString.split(","));
  const cleanedGenres = genreWords.map((genre) => genre.trim());
  const uniqueGenres = [...new Set(cleanedGenres)];

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre.includes(selectedGenre))
    : movies;

  return (
    <div>
      <Navbar />
      <h4>Categories</h4>
      <div className="">
        <ul className="">
          {uniqueGenres.map((genre, index) => (
            <li className="" key={index}>
              <button onClick={() => handleGenreClick(genre)}>{genre}</button>
            </li>
          ))}
        </ul>
      </div>
      <h2>{selectedGenre ? `Movies in ${selectedGenre}` : "All Movies"}</h2>
      <Slider filmsToMap={filteredMovies} />
    </div>
  );
};

export default CategoriesPage;
