import { useContext } from "react";
import AllContext from "../../context/context";
import Navbar from "../../../components/Navbar";
import Trending from "../../../components/Trending";
import "./HomePage.css";
import Recommended from "../../../components/Recommended";

const HomePage = () => {
  const { bookmarks, setBookmarks, movies, setActiveMovie } =
    useContext(AllContext);

  return (
    <div id="homepage">
      <Navbar />
      <Trending
        movies={movies}
        setBookmarks={setBookmarks}
        bookmarks={bookmarks}
        setActiveMovie={setActiveMovie}
      />
      <Recommended
        movies={movies}
        setBookmarks={setBookmarks}
        bookmarks={bookmarks}
        setActiveMovie={setActiveMovie}
      />
    </div>
  );
};

export default HomePage;
