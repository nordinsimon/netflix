import { useState, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";

import file from "../../movies.json";
import { loginMock, authTokenMock } from "../mocks/handlers";

export const AllContext = createContext();

export const AllContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [activeMovie, setActiveMovie] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const logout = async () => {
    removeCookie("token");
    window.location.reload();
  };

  const login = (name, password) => {
    const user = { username: name, password: password };
    const res = loginMock(user);

    if (res.status === 200) {
      const data = res;
      const token = data.token.token;
      const user = data.token.name;
      setCookie("token", token);
      return user;
    }
    return false;
  };

  const authToken = () => {
    const token = cookies.token;
    //checks if token exist already
    if (token) {
      const res = authTokenMock(token);
      if (res.status === 200) {
        const data = res;
        const token = data.token.token;
        setCookie("token", token);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

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
        logout,
        login,
        authToken,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export default AllContext;
