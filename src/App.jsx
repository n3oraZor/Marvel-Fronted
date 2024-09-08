import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Comics from "./components/Comics";
import Characters from "./components/Characters";
import Comic from "./components/Comic";
import Character from "./components/Character";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Favoris from "./components/Favoris";

import marvelLogo from "./sources/MarvelLogo.png";

import "./App.css";

//Supprime le cookie quand l'user se deconnecte
const removeCookieWhenLogOff = () => {
  Cookies.remove("token");
  location.reload();
};

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <Router>
      <div className="homepage">
        <Link to="/">
          <img src={marvelLogo} alt="LogoMarvel" id="marvelLogo" />
        </Link>

        <div className="container-navigation">
          <Link to="/Characters">
            <p>CHARACTERS</p>
          </Link>
          <Link to="/Comics">
            <p>COMICS</p>
          </Link>
          <Link to="/Favoris">
            <p> &#9733;</p>
          </Link>
          {!Cookies.get("token") && (
            <Link to="/signup">
              <p>SIGNUP</p>
            </Link>
          )}

          {!Cookies.get("token") && (
            <Link to="/login">
              <p>LOGIN</p>
            </Link>
          )}

          {Cookies.get("token") && (
            <Link to="/">
              <p onClick={removeCookieWhenLogOff}>LOGOFF</p>
            </Link>
          )}
        </div>
      </div>
      <Routes>
        <Route>
          <Route path="/Comics" element={<Comics />} />
          <Route path="/Comic/:comicId" element={<Comic />} />
          <Route path="/Characters" element={<Characters />} />
          <Route path="/Character/:characterId" element={<Character />} />
          <Route path="/Comics/:characterid" element={<Comics />} />
          <Route path="/Signup/" element={<Signup />} />
          <Route path="/Login/" element={<Login />} />
          <Route path="/Favoris/" element={<Favoris />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
