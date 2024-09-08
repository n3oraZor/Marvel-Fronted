import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "react-localstorage-hook";

const Favoris = () => {
  const getDataFromLocalStorage = localStorage.getItem("FavoriteCharacters");
  const dataFromLocalStorage = JSON.parse(getDataFromLocalStorage);

  //console.log(dataFromLocalStorage);

  return getDataFromLocalStorage ? (
    <div>
      {dataFromLocalStorage.map((elem, index) => {
        return (
          <div key={index}>
            <div>{elem.name}</div>
            <div>{elem.description}</div>
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
