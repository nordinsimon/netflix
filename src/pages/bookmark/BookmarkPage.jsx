import { useContext } from "react";
import AllContext from "../../context/context"; 
import Navbar from "../../../components/Navbar";
import BookmarkMovies from "../../../components/BookmarkMovies";
import "./BookmarkPage.css";

const BookmarkPage = () => {
  const { bookmarks, setBookmarks, movies, setActiveMovie } = useContext(AllContext);
  
  return (
    <div id="bookmarkPage">
      <Navbar movies={movies} />
      <BookmarkMovies
        setBookmarks={setBookmarks}
        bookmarks={bookmarks}
        setActiveMovie={setActiveMovie}
      />
    </div>
  );
};

export default BookmarkPage;
