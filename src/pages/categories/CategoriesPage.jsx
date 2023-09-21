import { useContext } from "react";
import AllContext from "../../context/context";

const CategoriesPage = () => {
  const [bookmarks, setBookmarks, movies] = useContext(AllContext);
  return <div>categoriesPage</div>;
};

export default CategoriesPage;
