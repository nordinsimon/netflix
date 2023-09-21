import { useContext } from "react";
import AllContext from "../../context/context";

const HomePage = () => {
  const [bookmarks, setBookmarks, movies] = useContext(AllContext);
  return <div>homePage</div>;
};

export default HomePage;
