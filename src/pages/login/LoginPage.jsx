import { useState } from "react";
import { useNavigate } from "react-router-dom";

import login from "../../auth/login";

import "./LoginPage.css";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(username, password);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h1>Netflix Login</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
