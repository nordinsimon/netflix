import { useState, useEffect } from "react";

import Slider from "./Slider";

const Trending = ({ movies,...props }) => {
  let trendingMovies = movies.filter(
    (movie) => movie.isTrending === true && movie.thumbnail !== undefined,
  );
  const [trending, setTrending] = useState(trendingMovies);

  // to make carousel work when reloading page
  useEffect(() => {
    const filteredMovies = movies.filter(
      (movie) => movie.isTrending === true && movie.thumbnail !== undefined,
    );
    setTrending(filteredMovies);
  }, [movies]);

  return (
    <div {...props}>
      <h4>Trending</h4>
      <Slider filmsToMap={trending} />
    </div>
  );
};

export default Trending;
