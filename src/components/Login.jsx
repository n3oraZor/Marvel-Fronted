import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import "./features_style.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);

  const postRequestFindUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--marvel-backend--6zq9tqc62vcv.code.run/login",
        {
          email,
          password,
        }
      );

      Cookies.set("token", response.data.token, { expires: 7 });
      location.reload(navigate("/"));
    } catch (error) {
      console.error(error.message);
      setErrorMessage(true);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-container-inside">
        <h1>CONNECT TO MY ACCOUNT</h1>
        <form onSubmit={postRequestFindUser}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" id="submit">
            CONNECT
          </button>
          <Link to="/user/signup">
            <span>Pas encore de compte ? Inscris-toi</span>
          </Link>
          {errorMessage && (
            <div className="erreur-login">
              L'utilisateur ou le MDP est incorrect
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
