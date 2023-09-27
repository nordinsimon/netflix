import { useContext, useState } from "react";
import AllContext from "../../context/context";
import moviesData from "../../../movies.json";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// import Navbar from "../../../components/Navbar";

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
      <h1 className="text-white flex justify-center">Categories</h1>
      <div className="overflow-x-auto">
        <ul className="flex space-x-8 p-8 justify-center">
          {uniqueGenres.map((genre, index) => (
            <li className="text-white" key={index}>
              <button onClick={() => handleGenreClick(genre)}>{genre}</button>
            </li>
          ))}
        </ul>
      </div>
      <h2>{selectedGenre ? `Movies in ${selectedGenre}` : "All Movies"}</h2>
      <div className="overflow-x-scroll">
        <ul className="flex space-x-4 p-4">
          {filteredMovies.map((movie, index) => (
            <li key={index} className="w-64 h-64">
              <img
                className="w-full h-full object-cover rounded-lg shadow-md scroll-smooth"
                src={movie.thumbnail}
                alt={movie.title}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesPage;
