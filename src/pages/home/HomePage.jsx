import { useContext } from "react";
import AllContext from "../../context/context";

import logout from "../../auth/logout";

const HomePage = () => {
  const [bookmarks, setBookmarks, movies] = useContext(AllContext);
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;
