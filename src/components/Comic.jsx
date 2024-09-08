import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Comic = () => {
  const { comicId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(`https://site--marvel-backend--6zq9tqc62vcv.code.run/comic/${comicId}`);
    setData(response.data);
    setLoading(false);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, [comicId]);

  return isLoading ? (
    <div>Please wait while fetching datas...</div>
  ) : (
    <div>
      <>
        <div>{data.title}</div>
        <div>{data.description}</div>
        <img
          src={`${data.thumbnail.path}/portrait_xlarge.jpg`}
          alt={data.title}
        />
      </>
    </div>
  );
};

export default Comic;
