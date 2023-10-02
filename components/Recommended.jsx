import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import next from '../src/assets/next.png'
import './Trending.css'

const Recommended  = ({movies, setBookmarks, bookmarks, setActiveMovie}) => {
    const [recommended, setRecommended]= useState([])
    const [index, setIndex] = useState(0);
    const length = recommended.length;

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      }
      
      useEffect(() => {
        if (movies.length > 0) {
          const shuffledMovies = shuffleArray(movies);
          const filteredMovies = shuffledMovies.filter((movie) => !movie.isTrending);
          const limitedRecommended = filteredMovies.slice(0, 10);
          setRecommended(limitedRecommended);
        }
      }, [movies]);
    
        
    const [hover, setHover] = useState(null)
    const navigate = useNavigate()

    const reorderMovies = (currentIndex) => {
        const slicedMovies = recommended.slice(currentIndex);
        const reorderedMovies = [...slicedMovies, ...recommended.slice(0, currentIndex)];
        return reorderedMovies;
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
        }
    
        const pickMovie = (activeMovie) => {
            setActiveMovie(activeMovie)
           navigate('/filmView')
        }

        const nextSlide = () => {
            setIndex((index + 1) % length);
        };
    
        const prevSlide = () => {
            setIndex((index - 1 + length) % length);
        };
        const reorderedReccMovies = reorderMovies(index);
    

      
    return(
        <div>
            <h4>Recommended</h4>
            <div className="what">
            <img style={{ width: "auto", height: "100%", marginTop: 100 }} onClick={() => prevSlide()} src={next} className="nextic"></img>

            <ul className="carousel">
            {reorderedReccMovies.map((movie, index) =>(
                 <li className='trendingMovies' key={index} style={{backgroundImage: movie.thumbnail}}onMouseOver={() => setHover(index)}onMouseLeave={() => setHover(null)} >
                 <img className="movie" src={movie.thumbnail} alt={`Movie ${index}`} onClick={() => pickMovie(movie)}  />
                 {hover === index && <div className="movieInfo2">
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
    ) 
}

export default Recommended