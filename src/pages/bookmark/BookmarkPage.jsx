import { useContext } from "react";
import AllContext from "../../context/context";

const BookmarkPage = () => {
  const [bookmarks, setBookmarks, movies] = useContext(AllContext);
  return <div>bookmarkPage</div>;
};

export default BookmarkPage;
