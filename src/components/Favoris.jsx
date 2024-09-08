import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "react-localstorage-hook";

import "./features_style.css";

const Favoris = () => {
  const getDataFromLocalStorage = localStorage.getItem("FavoriteCharacters");
  const dataFromLocalStorage = JSON.parse(getDataFromLocalStorage);

  //console.log(dataFromLocalStorage);

  return getDataFromLocalStorage ? (
    <div className="favorite-container">
      {dataFromLocalStorage.map((elem, index) => {
        return (
          <div className="container" key={index}>
            <h2>{elem.name || "Titre indisponible"} </h2>
            <p>{elem.description || "Description indisponible"}</p>
            <div>
              <img src={elem.photo} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p>Vous n'avez aucun favoris pour le moment, revenez plus tard</p>
  );
};

export default Favoris;
