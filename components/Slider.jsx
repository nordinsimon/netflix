import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import next from "../src/assets/next.png";

import AllContext from "../src/context/context";
import { checkRating } from "./checkRatingFunc";
import "./Slider.css";

const Slider = ({ filmsToMap }) => {
  const { setBookmarks, bookmarks, setActiveMovie } = useContext(AllContext);
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(null);
  const length = filmsToMap.length;
  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  useEffect(() => {
    if (index < 0) {
      setIndex(length - 1);
    } else if (index >= length) {
      setIndex(0);
    }
  }, [index, length]);

  useEffect(() => {
    const updateScreenWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const nextSlide = () => {
    setIndex((index + 1) % length);
  };

  const prevSlide = () => {
    setIndex((index - 1 + length) % length);
  };
  const handleBookmark = (movie) => {
    const duplicate = bookmarks.find((film) => film.title === movie.title);
    if (duplicate) {
      const index = bookmarks.indexOf(movie);
      const newlist = [...bookmarks];
      newlist.splice(index, 1);
      setBookmarks(newlist);
    } else {
      setBookmarks([...bookmarks, movie]);
    }
  };
  const reorderMovies = (currentIndex) => {
    const slicedMovies = filmsToMap.slice(currentIndex);
    const reorderedMovies = [
      ...slicedMovies,
      ...filmsToMap.slice(0, currentIndex),
    ];
    return reorderedMovies;
  };
  const reorderedMovies = reorderMovies(index);

  const pickMovie = (activeMovie) => {
    setActiveMovie(activeMovie);
    navigate("/filmView");
  };

  return (
    <div className="what">
      <img
        style={
          width < 370
            ? { width: "auto", height: "30px", marginTop: 100 }
            : { width: "auto", height: "100%", marginTop: 100 }
        }
        onClick={() => prevSlide()}
        src={next}
        className="nextic"
      ></img>

      <ul className="carousel">
        {reorderedMovies.map((movie, movieIndex) => (
          <li
            className="slidingMovies"
            key={movieIndex}
            style={{ backgroundImage: movie.thumbnail }}
            onMouseOver={() => setHover(movieIndex)}
            onMouseLeave={() => setHover(null)}
          >
            <img
              className="movie"
              src={movie.thumbnail}
              alt={movie.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/380x562.png?text=No+Thumbnail+Available";
              }}
              onClick={() => pickMovie(movie)}
            />
            {hover === movieIndex && (
              <div className="movieInfo">
                <div onClick={() => handleBookmark(movie)}>
                  <svg
                    id="lager-1"
                    data-name="Lager 2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 4.42 7.76"
                    width="23"
                    height="22"
                  >
                    <path
                      className={"cls-1"}
                      data-testid="bookmarkFilm"
                      fill={
                        bookmarks.some(
                          (bookmark) => bookmark.title === movie.title,
                        )
                          ? "red"
                          : "none"
                      }
                      stroke={
                        bookmarks.some(
                          (bookmark) => bookmark.title === movie.title,
                        )
                          ? "red"
                          : "white"
                      }
                      d="m.28.27c1.3,0,2.59-.01,3.89-.02v6.88l-1.96-2.08L.25,7.13c0-2.29.02-4.57.03-6.86Z"
                    ></path>{" "}
                  </svg>
                </div>
                <h6>
                  {movie.year}{" "}
                  <span className={checkRating(movie.rating)}>
                    {movie.rating}
                  </span>
                </h6>
                <h5>{movie.title}</h5>
                <h6>{movie.genre}</h6>
              </div>
            )}
          </li>
        ))}
      </ul>
      <img
        style={
          width < 370
            ? { width: "auto", height: "30px", marginTop: 100 }
            : { width: "auto", height: "100%", marginTop: 100 }
        }
        onClick={() => nextSlide()}
        src={next}
        className="prevIc"
        alt="nextImage"
      ></img>
    </div>
  );
};

export default Slider;
