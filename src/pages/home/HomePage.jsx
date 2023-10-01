import { useContext } from "react";
import AllContext from "../../context/context";
import Navbar from "../../../components/Navbar";

import logout from "../../auth/logout";

const HomePage = () => {

  const [bookmarks, setBookmarks, movies, setActiveMovie] = useContext(AllContext);
  return (
    <div>
      <Navbar movies={movies}/>
    </div>
  );
};

export default HomePage;
