import logout from "../src/auth/logout";
import './Navbar.css'
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()

  return(
    <div id="nav">
      <ul id="left">
        <li onClick={()=> navigate("/")}>Home</li>
        <li onClick={()=>navigate('/categories')}>Categories</li>
      </ul>
      <ul id="right">
        <li onClick={() => navigate('/bookmarks')}><i className="fa fa-bookmark"></i></li>
      <li>
      <button onClick={logout}>Logout</button>
      </li>
      </ul>
    </div>
  )
};

export default Navbar;
