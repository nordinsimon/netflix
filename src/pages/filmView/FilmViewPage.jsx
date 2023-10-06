import { useContext } from "react";
import AllContext from "../../context/context";
import "./FilmViewPage.css";
import Navbar from "../../../components/Navbar";
import { checkRating } from "../../../components/checkRatingFunc";
import BookmarkButton from "../../../components/BookmarkButton";

const FilmViewPage = () => {
  const { activeMovie } = useContext(AllContext);

  const genres =
    typeof activeMovie.genre === "string" ? activeMovie.genre.split(",") : [];

  return (
    <div className="containerFilm">
      <Navbar />
      <div>
        <h2>{activeMovie.title}</h2>
        <h6 className="year">{activeMovie.year}</h6>
      </div>
      <img
        src={activeMovie.thumbnail}
        alt={`${activeMovie.title} Thumbnail`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://via.placeholder.com/380x562.png?text=No+Thumbnail+Available";
        }}
      />
      <div id="bookmarkBtn">
        <BookmarkButton movie={activeMovie} />
      </div>
      <div id="genres">
        <h5 id={checkRating(activeMovie.rating)}>{activeMovie.rating}</h5>
        {genres.map((genre, index) => (
          <h6 key={index} className="genreFilm">
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
