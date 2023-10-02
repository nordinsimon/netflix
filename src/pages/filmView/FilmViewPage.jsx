import { useContext } from "react";
import AllContext from "../../context/context";
import './filmViewPage.css'
import moviesData from '../../../movies.json'
import BookmarkButton from "../../../components/BookmarkButton";

const FilmViewPage = () => {
  const {activeMovie} = useContext(AllContext);

  return (
    <div className="container">
    <h1>{activeMovie.title} ({activeMovie.year})</h1>
    <img src={activeMovie.thumbnail} alt={`${activeMovie.title} Thumbnail`} />
    <BookmarkButton movie={activeMovie} />
    <p><strong>Rating:</strong> {activeMovie.rating}</p>
    <p><strong>Genre:</strong> {activeMovie.genre}</p>
    <ul className="actors">
      <p><strong>Actors:</strong></p>
      {activeMovie.actors ? activeMovie.actors.map(actor => <li key={actor}>{actor}</li>) : 'No actors listed.'}
    </ul>
    <p><strong>Synopsis:</strong> {activeMovie.synopsis}</p>
  </div>
  )
};
 
export default FilmViewPage;
