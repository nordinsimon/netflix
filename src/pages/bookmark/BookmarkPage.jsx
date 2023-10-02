import { useContext } from "react";
import AllContext from "../../context/context";
import Navbar from "../../../components/Navbar";

const BookmarkPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { bookmarks, setBookmarks, movies } = useContext(AllContext);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default BookmarkPage;
