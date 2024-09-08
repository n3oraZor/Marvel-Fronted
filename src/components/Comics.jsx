import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./Characters.css";

const Comics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState(null);
  const [skipPage, setSkipPage] = useState(null);

  //URLSearch pour récupérer la partie lisible de l'url (après ?) et document.location.search pour récuperer l'URL complète
  let params = new URLSearchParams(document.location.search);
  let title = params.get("name");
  let limit = params.get("limit");
  let skip = params.get("slip");

  const skipPageFunctionAdd = () => {
    setSkipPage(skipPage + 100);
  };

  const skipPageFunctionRemove = () => {
    setSkipPage(skipPage > 100 ? skipPage - 100 : 0);
  };

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--marvel-backend--6zq9tqc62vcv.code.run/comics",
      {
        params: {
          title: title || searchName,
          skip: skip || skipPage,
        },
      }
    );

    //fonction pour trier les données
    const dataSorting = response.data.results.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    setData(dataSorting);
    //console.log(dataSorting);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [isLoading, searchName, skipPage]);

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
          placeholder="find your comic"
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
            <h2>{elem.title || "Titre indisponible"} </h2>
            <p>{elem.description || "Description indisponible"}</p>
            <Link to={`/comic/${elem._id}`}>
              <img
                src={`${elem.thumbnail.path}/portrait_xlarge.jpg`}
                alt={elem.title}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Comics;
