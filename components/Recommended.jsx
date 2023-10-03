import { useState, useEffect } from "react";

import Slider from "./Slider";

const Recommended = ({ movies }) => {
  const [recommended, setRecommended] = useState([]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    if (movies.length > 0) {
      const shuffledMovies = shuffleArray(movies);
      const filteredMovies = shuffledMovies.filter(
        (movie) => !movie.isTrending,
      );
      const limitedRecommended = filteredMovies.slice(0, 10);
      setRecommended(limitedRecommended);
    }
  }, [movies]);

  return (
    <div>
      <h4>Recommended</h4>
      <Slider filmsToMap={recommended} />
    </div>
  );
};

export default Recommended;
