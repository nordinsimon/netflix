import { useContext } from "react";
import AllContext from "../../context/context";
import "./FilmViewPage.css";
import Navbar from "../../../components/Navbar";

import BookmarkButton from "../../../components/BookmarkButton";

const FilmViewPage = () => {
  const { activeMovie } = useContext(AllContext);

  const genres =
    typeof activeMovie.genre === "string" ? activeMovie.genre.split(",") : [];

  const checkRating = (rating) => {
    switch (rating) {
      case "PG":
        return "ratingPG";
      case "G":
        return "ratingG";
      case "PG-13":
        return "ratingPG13";
      case "R":
        return "ratingR";
      default:
        return "noRating";
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div>
        <h2>{activeMovie.title}</h2>
        <h6 className="year">{activeMovie.year}</h6>
      </div>
      <img src={activeMovie.thumbnail} alt={`${activeMovie.title} Thumbnail`} />
      <div id="bookmarkBtn">
        <BookmarkButton movie={activeMovie} />
      </div>
      <div id="genres">
        <h5 id={checkRating(activeMovie.rating)}>{activeMovie.rating}</h5>
        {genres.map((genre, index) => (
          <h6 key={index} className="genre">
            {genre}
          </h6>
        ))}
      </div>
      <p>
        <strong>Actors</strong>
      </p>
      <ul className="actors">
        {activeMovie.actors
          ? activeMovie.actors.map((actor) => <li key={actor}>{actor}</li>)
          : "No actors listed."}
      </ul>
      <p>
        <strong>Synopsis</strong>
      </p>
      <p className="synopsis">{activeMovie.synopsis}</p>
    </div>
  );
};

export default FilmViewPage;
