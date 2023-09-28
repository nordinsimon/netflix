import { useContext } from "react";
import AllContext from "../../context/context";
import Navbar from "../../../components/Navbar";

const HomePage = () => {

  const [bookmarks, setBookmarks, movies, setActiveMovie] = useContext(AllContext);
  return (
    <div>
      <Navbar movies={movies}/>
    </div>
  );
    

};

export default HomePage;
