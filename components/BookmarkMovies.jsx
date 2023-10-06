import { useContext } from "react";

import { AllContext } from "../src/context/context";
import Slider from "./Slider";
import "./BookmarkMovies.css";

const Bookmarked = () => {
  const { bookmarks } = useContext(AllContext);

  return (
    <div>
      <h4>Bookmarked Movies</h4>
      {bookmarks.length === 0 ? (
        <p className="err">You have not bookmarked any movies yet.</p>
      ) : (
        <Slider filmsToMap={bookmarks} />
      )}
    </div>
  );
};

export default Bookmarked;
