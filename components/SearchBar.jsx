import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AllContext } from "/src/context/context";
import "./SearchBar.css";

const SearchBar = ({ setSearching }) => {
  const { movies, setActiveMovie } = useContext(AllContext);
  const [input, setInput] = useState("");
  const [movieNotFound, setMovieNotFound] = useState(null);
  const [tooShort, setTooShort] = useState(false);

  const navigate = useNavigate();

  const searchHandler = () => {
    if (input === "" || input === " " || input.length < 3) {
      setTooShort(true);
      return;
    } else {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(input.toLowerCase()),
      );
      if (filteredMovies.length === 0) {
        setTooShort(false);
        setMovieNotFound(true);
        return;
      }
      setActiveMovie(filteredMovies[0]);
      setTooShort(false);
      setSearching(false);
      setMovieNotFound(false);
      navigate("/filmView");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchHandler();
    }
  };

  return (
    <div className="searchBox">
      <div className="title"></div>
      <div id="searchField">
        <input
          type="text"
          placeholder="Search for movies"
          onChange={(event) => setInput(event.target.value)}
          value={input}
          onKeyUp={handleKeyPress}
        />
        <button
          className="close"
          data-testid="search"
          onClick={searchHandler}
        ></button>
        <button id="close" onClick={() => setSearching(false)}>
          X
        </button>
        {movieNotFound && <p>Movie not found</p>}
        {tooShort && <p>Search must be at least 3 characters</p>}
      </div>
    </div>
  );
};

export default SearchBar;
