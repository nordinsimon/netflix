import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AllContext from "../../context/context";

import "./LoginPage.css";

export const LoginPage = () => {
  const { login } = useContext(AllContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [unathorised, setUnathorised] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(username, password);
    if (result) {
      navigate("/");
    }
    setUnathorised(true);
    setPassword("");
  };
  const handleKeyPress = (event) => {
    setUnathorised(false);
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div>
      <h2 id="welcome">Welcome back!</h2>
      <div className="input-container">
        <input
          className="loginPage"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          className="loginPage"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onKeyUp={handleKeyPress}
        />
      </div>
      {unathorised ? <p>Wrong username or password</p> : null}
      <button id="loginBtn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
