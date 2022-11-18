import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Pagination from "../components/Pagination";

import thumbUp from "../assets/images/thumbup.png";
import Cookies from "js-cookie";

const Characters = ({
  urlBase,
  limit,
  setLimit,
  pageNumber,
  setPageNumber,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const tab = Cookies.get("character-favorite")
    ? JSON.parse(Cookies.get("character-favorite"))
    : [];
  // const [tabFavorite, setTabFavorite] = useState(
  //   JSON.parse(Cookies.get("character-favorite")) || []
  // );
  const [tabFavorite, setTabFavorite] = useState(tab);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${urlBase}/characters?limit=${limit}&skip=${
            (pageNumber - 1) * limit
          }&name=${name}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error -> ", error);
      }
    };

    fetchData();
  }, [urlBase, limit, pageNumber, name]);

  // Gestion du cookie
  const handleFavorite = (id) => {
    const tab = [...tabFavorite];
    const indexId = tab.indexOf(id);
    console.log("handleFavorite -> ", tab.length, " - ", indexId);
    // Si l'id est référencé dans les cookies, on souhaite enlever le favori
    if (indexId >= 0) {
      tab.splice(indexId, 1);
      // S'il n'existe pas, on l'ajoute
    } else {
      tab.push(id);
    }

    setTabFavorite(tab);

    Cookies.set("character-favorite", JSON.stringify(tab));
  };

  return isLoading ? (
    <p> Loading ... </p>
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>
      <div className="pagination-container">
        <Pagination
          data={data}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          setLimit={setLimit}
          limit={limit}
        />
      </div>
      <div className="comics-characters-container">
        {data.results.map((character, index) => {
          return (
            <div className="character-container" key={character._id}>
              <div className="character-favorite-container">
                <img
                  src={thumbUp}
                  alt="thumbUp"
                  className={
                    tabFavorite.includes(character._id) ? "favorite" : null
                  }
                  onClick={() => {
                    handleFavorite(character._id);
                  }}
                />
              </div>
              <Link to="/Character" state={{ character: character }}>
                <img
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  alt="character"
                />
              </Link>
              <div className="character-container-footer">
                <h3>{character.name}</h3>
                <button
                  onClick={() => {
                    toast.success(`${character.description} 🚀`);
                  }}
                >
                  Plus...
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Characters;
