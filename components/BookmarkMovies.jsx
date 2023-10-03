import { useContext } from "react";

import { AllContext } from "../src/context/context";
import Slider from "./Slider";

const Bookmarked = () => {
  const { bookmarks } = useContext(AllContext);

  return (
    <div>
      <h4>Bookmarked Movies</h4>
      {bookmarks.length === 0 ? (
        <p>You have not bookmarked any movies yet.</p>
      ) : (
        <Slider filmsToMap={bookmarks} />
      )}
    </div>
  );
};

export default Bookmarked;
