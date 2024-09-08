import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Character = () => {
  const { characterId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  //nouveau useState pour stocker dans un tableau les données de chaque comic
  const [comicsDetails, setComicsDetails] = useState([]);

  /// on réutilise la fonction pour fetcher du comic (see comic.jsx)
  const fetchComicData = async (comicId) => {
    //console.log(comicId);
    const response = await axios.get(`https://site--marvel-backend--6zq9tqc62vcv.code.run/comic/${comicId}`);
    //console.log("fetchComicData message", response.data);
    return response.data;
  };

  // Fonction pour récupérer les données du personnage et les détails des comics associés
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--marvel-backend--6zq9tqc62vcv.code.run/character/${characterId}`
      );
      setData(response.data);

      // Récupérer les détails pour chaque comic ID
      console.log(response.data.comics);

      const getDataFromComic = response.data.comics.map((comicId) =>
        fetchComicData(comicId)
      );

      //execute en parrallèle les requetes
      //console.log("requete en cours");
      const dataFromComic = await Promise.all(getDataFromComic);
      //console.log(dataFromComic);
      setComicsDetails(dataFromComic);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <div>Please wait while fetching datas...</div>
  ) : (
    <>
      <div>{data.name}</div>
      <div>{data.description}</div>
      <img src={`${data.thumbnail.path}/portrait_xlarge.jpg`} alt={data.name} />

      <div>
        {comicsDetails.map((elem, index) => (
          <div key={index}>
            <h3>{elem.title}</h3>
            <p>{elem.description}</p>
            <img
              src={`${elem.thumbnail.path}/portrait_xlarge.jpg`}
              alt={elem.title}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Character;
