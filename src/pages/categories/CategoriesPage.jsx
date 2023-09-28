import { useContext, useState } from "react";
import AllContext from "../../context/context";
import moviesData from "../../../movies.json";

// import Navbar from "../../../components/Navbar";

const CategoriesPage = () => {
  const [bookmarks, setBookmarks, movies] = useContext(AllContext);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const allGenres = moviesData.map((movie) => movie.genre);
  const genreWords = allGenres.flatMap((genreString) => genreString.split(","));
  const cleanedGenres = genreWords.map((genre) => genre.trim());
  const uniqueGenres = [...new Set(cleanedGenres)];

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setCurrentIndex(0);
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre.includes(selectedGenre))
    : movies;

  const moviesPerPage = 3;
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + moviesPerPage < filteredMovies.length
        ? prevIndex + moviesPerPage
        : prevIndex
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - moviesPerPage >= 0 ? prevIndex - moviesPerPage : prevIndex
    );
  };

  const visibleMovies = filteredMovies.slice(
    currentIndex,
    currentIndex + moviesPerPage
  );

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
      <div className="overflow-x-auto justify-center relative">
        <ul className="flex space-x-8 p-8 justify-center">
          {visibleMovies.map((movie, index) => (
            <li key={index} className="w-64 h-64">
              <img
                className="w-full h-full object-cover rounded-lg shadow-md scroll-smooth"
                src={movie.thumbnail}
                alt={movie.title}
              />
              <div className="absolute inset-0 flex justify-between items-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <button
                  onClick={prevSlide}
                  className={`${
                    currentIndex === 0 ? "invinsible" : "visible"
                  } bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors duration-300 cursor-pointer`}
                >
                  <svg className="h-6 w-6 transform rotate-180" fill="white">
                    <polygon points="22 12 9 5 9 18 22 12" />
                  </svg>
                </button>
                <buton
                  onClick={nextSlide}
                  className={`${
                    currentIndex + moviesPerPage >= filteredMovies.length
                      ? "invisible"
                      : "visible"
                  } bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors duration-300 cursor-pointer`}
                >
                  <svg className="h-6 w-6" fill="white">
                    <polygon points="22 12 9 5 9 18 22 12" />
                  </svg>
                </buton>
              </div>
            </li>
          ))}
        </ul>
        {/* <div className="flex justify-between mt-4">
          <button
            onClick={prevSlide}
            className={`${
              currentIndex === 0 ? "invinsible" : "visible"
            } bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors duration-300 cursor-pointer`}
          >
            <svg className="h-6 w-6 transform rotate-180" fill="white">
              <polygon points="22 12 9 5 9 18 22 12" />
            </svg>
          </button>
          <buton
            onClick={nextSlide}
            className={`${
              currentIndex + moviesPerPage >= filteredMovies.length
                ? "invisible"
                : "visible"
            } bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors duration-300 cursor-pointer`}
          >
            <svg className="h-6 w-6" fill="white">
              <polygon points="22 12 9 5 9 18 22 12" />
            </svg>
          </buton>
        </div> */}
      </div>
    </div>
  );
};

export default CategoriesPage;
