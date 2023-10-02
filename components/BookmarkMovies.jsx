import { useContext, useState, useEffect } from "react";
import "./BookmarkMovies.css";
import next from "../src/assets/next.png";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../src/context/context"; 

const Bookmarked = () => {
    const { bookmarks, setBookmarks, setActiveMovie } = useContext(AllContext);
    const [index, setIndex] = useState(0);
    const length = bookmarks ? bookmarks.length : 0; 
    const [hover, setHover] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (length === 0) return; 
        if (index < 0) {
          setIndex(length - 1);
        } else if (index >= length) {
          setIndex(0);
        }
      }, [index, length]);

      const nextSlide = () => {
        console.log('Next Clicked!');
        if (length > 0) setIndex((index + 1) % length); 
      };
    
      const prevSlide = () => {
        console.log('Prev Clicked!');
        if (length > 0) setIndex((index - 1 + length) % length);
      };

      const handleBookmark = (movie) => {
        const index = bookmarks.indexOf(movie);
        if (index !== -1) { 
          const newlist = [...bookmarks];
          newlist.splice(index, 1);
          setBookmarks(newlist);
        }
      };

  const pickMovie = (activeMovie) => {
    setActiveMovie(activeMovie);
    navigate("/filmView");
  };

  return (
    <div>
      <h4>Bookmarked Movies</h4>
      <div className="bookmarkMovies">
        {length > 0 && (
          <img
            onClick={() => prevSlide()}
            src={next}
            className="leftButton"
            alt="Previous Slide"
          />
        )}
        
        <ul className="carousel_Bookmark">
          {bookmarks.map((movie, movieIndex) => (
            <li
              className="bookmarkMovies"
              key={movieIndex}
              style={{ backgroundImage: `url(${movie.thumbnail})` }}
              onMouseOver={() => setHover(movieIndex)}
              onMouseLeave={() => setHover(null)}
            >
              <img
                className="movie"
                src={movie.thumbnail}
                alt={`Movie ${movieIndex}`}
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
                        className={
                          bookmarks.includes(movie) ? "activeBookmark" : "cls-1"
                        }
                        fill={bookmarks.includes(movie) ? "red" : "none"}
                        stroke={bookmarks.includes(movie) ? "red" : "white"}
                        d="m.28.27c1.3,0,2.59-.01,3.89-.02v6.88l-1.96-2.08L.25,7.13c0-2.29.02-4.57.03-6.86Z"
                      ></path>{" "}
                    </svg>
                  </div>
                  <h6>
                    {movie.year} {movie.rating}
                  </h6>
                  <h5>{movie.title}</h5>
                  <h6>{movie.genre}</h6>
                  <h5>{movie.synopsis}</h5>
                </div>
              )}
            </li>
          ))}
        </ul>
        
        {length > 0 && (
          <img
            onClick={() => nextSlide()}
            src={next}
            className="rightButton"
            alt="Next Slide"
          />
        )}
      </div>
    </div>
  );
};

export default Bookmarked;
