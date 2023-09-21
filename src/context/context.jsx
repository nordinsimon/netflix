import { useState, createContext } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  return (
    <Context.Provider value={[bookmarks, setBookmarks, movies, setMovies]}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
