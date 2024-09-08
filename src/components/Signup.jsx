import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();

  const postRequestCreateUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://site--marvel-backend--6zq9tqc62vcv.code.run/signup", {
        email,
        username,
        password,
      });

      //si retour ok on doit avoir le token dans reponse.data.token
      response.data.token &&
        Cookies.set("token", response.data.token, { expires: 5 });
      location.reload();
      // navigate("/");
    } catch (error) {
      console.error(error.message);
      setErrorMessage(true);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-container-inside">
        <h1>S'inscrire</h1>

        <form onSubmit={postRequestCreateUser}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Nom d'utilisateur"
            onChange={(e) => setUsername(e.target.value)}
          />
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

          {errorMessage && (
            <div className="compte-existant">Le compte est déja existant</div>
          )}
          <button type="submit" id="submit">
            S'inscrire
          </button>

          <Link to="/login">
            <span>Tu as déjà un compte ? Connecte-toi !</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
