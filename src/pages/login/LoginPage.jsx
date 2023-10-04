import { useState } from "react";
import { useNavigate } from "react-router-dom";

import login from "../../auth/login";

import "./LoginPage.css";

export const LoginPage = () => {
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
    <div className="container">
      <h2>Welcome back!</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
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
