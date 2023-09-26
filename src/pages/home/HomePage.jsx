import { useContext } from "react";
import AllContext from "../../context/context";
import Navbar from "../../../components/Navbar";

const HomePage = () => {
  const [bookmarks, setBookmarks, movies] = useContext(AllContext);
  return (
    <div>
    <Navbar/>
    </div>
  )
};

export default HomePage;
