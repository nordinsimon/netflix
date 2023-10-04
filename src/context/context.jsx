import { useState, createContext, useEffect } from "react";

import file from "../../movies.json";

export const AllContext = createContext();

export const AllContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeMovie, setActiveMovie] = useState({});

  //movies disappeared otherwise
  useEffect(() => {
    setMovies(file);

    const localBookmarks = localStorage.getItem("bookmarks");
    if (localBookmarks && Array.isArray(JSON.parse(localBookmarks))) {
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
