import { useContext } from "react";
import AllContext from "../../context/context";
import './filmViewPage.css'
import moviesData from '../../../movies.json'

const FilmViewPage = () => {
  const [bookmarks, setBookmarks, movies] = useContext(AllContext);
  const movie = moviesData[0]; 

  return (
    <div className="container">
    <h1>{movie.title} ({movie.year})</h1>
    <img src={movie.thumbnail} alt={`${movie.title} Thumbnail`} />
    <p><strong>Rating:</strong> {movie.rating}</p>
    <p><strong>Genre:</strong> {movie.genre}</p>
    <ul className="actors">
      <p><strong>Actors:</strong></p>
      {movie.actors.map(actor => <li key={actor}>{actor}</li>)}
    </ul>
    <p><strong>Synopsis:</strong> {movie.synopsis}</p>
  </div>
  )
};

export default FilmViewPage;
