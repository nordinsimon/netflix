import { useState, createContext, useEffect } from "react";

import file from "../../movies.json";

const exampleFavoutites = [
  {
    title: "Gladiator",
    year: 2000,
    rating: "R",
    actors: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    genre: "Action, Adventure, Drama",
    synopsis:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_QL75_UX380_CR0,0,380,562_.jpg",
  },
  {
    title: "The Godfather",
    year: 1972,
    rating: "R",
    actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    genre: "Crime, Drama",
    synopsis:
      "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,4,380,562_.jpg",
  },
];

export const AllContext = createContext();

export const AllContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [bookmarks, setBookmarks] = useState(exampleFavoutites);
  const [activeMovie, setActiveMovie] = useState({});

  //movies disappeared otherwise
  useEffect(() => {
    setMovies(file);

    const localBookmarks = localStorage.getItem("bookmarks");
    if (localBookmarks) {
      setBookmarks(JSON.parse(localBookmarks));
    }

    const localActiveMovie = localStorage.getItem("activeMovie");
    if (localActiveMovie) {
      setActiveMovie(JSON.parse(localActiveMovie));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("activeMovie", JSON.stringify(activeMovie));
  }, [activeMovie]);

  return (
    <AllContext.Provider
      value={{
        bookmarks,
        setBookmarks,
        movies,
        setMovies,
        activeMovie,
        setActiveMovie,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export default AllContext;
