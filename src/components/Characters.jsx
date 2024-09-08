import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "react-localstorage-hook";

import "./Characters.css";

const initializeState = () => {
  return JSON.parse(localStorage.getItem("FavoriteCharacters")) || [{}];
};

const Characters = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState(null);
  const [skipPage, setSkipPage] = useState(0);
  const [isliked, setIsliked] = useState(initializeState);

  localStorage.setItem("FavoriteCharacters", JSON.stringify(isliked));

  //   //URLSearch pour récupérer la partie lisible de l'url (après ?) et document.location.search pour récuperer l'URL complète
  let params = new URLSearchParams(document.location.search);
  let name = params.get("name");
  let limit = params.get("limit");
  let skip = params.get("skip");

  const getFavoriteItems = (item) => {
    const islikedCopy = [...isliked];
    console.log(islikedCopy);
    islikedCopy.find((elem) => elem.id === item.id)
      ? console.log("erreur")
      : islikedCopy.push(item);
    setIsliked(islikedCopy);
  };

  const skipPageFunctionAdd = () => {
    setSkipPage(skipPage + 100);
  };

  const skipPageFunctionRemove = () => {
    setSkipPage(skipPage > 100 ? skipPage - 100 : 0);
  };

  const fetchData = async (req, res) => {
    const response = await axios.get(
      "https://site--marvel-backend--6zq9tqc62vcv.code.run/characters",
      {
        // si les params ne sont pas donnés par l'url alors ils proviennent du choix utilisateur
        params: {
          name: name || searchName,
          skip: skip || skipPage,
        },
      }
    );

    //fonction pour trier les données
    const dataSorting = response.data.results.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setData(dataSorting);
    //console.log(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [isLoading, searchName, skipPage, isliked]);

  return isLoading ? (
    <div className="characters-container">
      Please wait while fetching datas...
    </div>
  ) : (
    <div className="characters-container">
      <form>
        <button
          type="button"
          id="buttonPrecedent"
          onClick={skipPageFunctionRemove}
        >
          -
        </button>
        <input
          type="search"
          name="searchBar"
          id="searchBar"
          placeholder="find your character"
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
        />
        <button type="button" id="buttonSuivant" onClick={skipPageFunctionAdd}>
          +
        </button>
      </form>

      {data.map((elem, index) => {
        return (
          <div className="container" key={index}>
            <h2>{elem.name || "Nom indisponible"}</h2>
            <p>{elem.description || "Description indisponible"}</p>

            <Link to={`/character/${elem._id}`}>
              <img
                src={`${elem.thumbnail.path}/portrait_xlarge.jpg`}
                alt={elem.name}
              />
            </Link>
            <div
              className="favorite"
              onClick={() => {
                getFavoriteItems({
                  id: elem._id,
                  name: elem.name,
                  description: elem.description,
                  photo: `${elem.thumbnail.path}/portrait_xlarge.jpg`,
                });
              }}
            >
              &#9733;
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Characters;
