import{ useState, useEffect } from "react";
import './Trending.css'
import next from '../src/assets/next.png'
import { useNavigate } from "react-router-dom";

const Trending = ({ movies, setBookmarks, bookmarks, setActiveMovie }) => {
    const trendingMovies = movies.filter((movie) => movie.isTrending === true && movie.thumbnail !== undefined);
    const [trending, setTrending] = useState(trendingMovies);
    const [index, setIndex] = useState(0);
    const length = trending.length;
    const [hover, setHover] = useState(null)

    const navigate = useNavigate()

    const reorderMovies = (currentIndex) => {
        const slicedMovies = trendingMovies.slice(currentIndex);
        const reorderedMovies = [...slicedMovies, ...trendingMovies.slice(0, currentIndex)];
        return reorderedMovies;
    };

    useEffect(() => {
        if (index < 0) {
            setIndex(length - 1);
        } else if (index >= length) {
            setIndex(0);
        }
    }, [index, length]);

    const nextSlide = () => {
        setIndex((index + 1) % length);
    };

    const prevSlide = () => {
        setIndex((index - 1 + length) % length);
    };

    const reorderedTrendingMovies = reorderMovies(index);

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
    }

    const pickMovie = (activeMovie) => {
        setActiveMovie(activeMovie)
       navigate('/filmView')
    }

    return (
        <div>
            <h4>Trending</h4>
            <div className="what">
            <img style={{ width: "auto", height: "100%", marginTop: 100 }} onClick={() => prevSlide()} src={next} className="nextic"></img>

            <ul className="carousel">
            {reorderedTrendingMovies.map((movie, movieIndex) => (
                    <li className='trendingMovies' key={movieIndex} style={{backgroundImage: movie.thumbnail}}onMouseOver={() => setHover(movieIndex)}onMouseLeave={() => setHover(null)} >
                        <img className="movie" src={movie.thumbnail} alt={`Movie ${movieIndex}`} onClick={() => pickMovie(movie)}  />
                        {hover === movieIndex && <div className="movieInfo">
                            <div onClick={() => handleBookmark(movie)}>
                             <svg id="lager-1" data-name="Lager 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.42 7.76" width="23" height="22">
                            <path className={bookmarks.includes(movie) ? "activeBookmark" : "cls-1"}fill={bookmarks.includes(movie) ? 'red' : 'none'} stroke={bookmarks.includes(movie) ? 'red' : 'white'} d="m.28.27c1.3,0,2.59-.01,3.89-.02v6.88l-1.96-2.08L.25,7.13c0-2.29.02-4.57.03-6.86Z"></path> </svg>
                            </div><h6>{movie.year} {movie.rating}</h6>
                           <h5>{movie.title}</h5>
                            <h6>{movie.genre}</h6>
                            </div>}
                    </li>
                ))}
            </ul>
            <img style={{ width: "auto", height: "100%", marginTop: 100 }} onClick={() => nextSlide()} src={next}></img>
            </div>
        </div>
    );
}

export default Trending;
