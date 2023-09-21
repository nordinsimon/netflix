import { useContext } from "react";
import AllContext from "../../context/context";

const FilmViewPage = () => {
  const [bookmarks, setBookmarks, movies] = useContext(AllContext);
  return <div>filmViewPage</div>;
};

export default FilmViewPage;
