import { useContext } from "react";
import AllContext from "../../context/context";

const FilmViewPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { bookmarks, setBookmarks, movies, activeMovie } =
    useContext(AllContext);
  return <div>filmViewPage</div>;
};

export default FilmViewPage;
