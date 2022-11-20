import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

// Les composants
import Pagination from "../components/Pagination";
import handleFavorite from "../components/handleFavorite";

// Les images
import thumbUp from "../assets/images/thumbup.png";
import noThumbUp from "../assets/images/nothumbup.png";

const Comics = ({ urlBase, limit, setLimit, pageNumber, setPageNumber }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const tab = Cookies.get("comics-favorite")
    ? JSON.parse(Cookies.get("comics-favorite"))
    : [];
  const [tabFavorite, setTabFavorite] = useState(tab);

  useEffect(() => {
    const fetchData = async () => {
      // Requête axios vers backend REACTEUR

      try {
        const response = await axios.get(
          `${urlBase}/comics?limit=${limit}&skip=${
            (pageNumber - 1) * limit
          }&title=${name}`
        );

        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error -> ", error);
      }
    };

    fetchData();
  }, [urlBase, limit, pageNumber, name]);

  return isLoading ? (
    <p> Loading ... </p>
  ) : (
    <>
      <div className="search-container">
        <input
          type="search"
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Tapez votre recherche ..."
        />
        <Link to="/">
          {" "}
          <button> Personnages </button>
        </Link>
      </div>
      <div className="">
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
                  src={
                    tabFavorite.includes(character._id) ? thumbUp : noThumbUp
                  }
                  alt="thumbUp"
                  className={
                    tabFavorite.includes(character._id)
                      ? "favorite"
                      : "nofavorite"
                  }
                  onClick={() => {
                    handleFavorite(
                      character._id,
                      tabFavorite,
                      setTabFavorite,
                      "comics-favorite"
                    );
                  }}
                />
              </div>
              <div>
                <img
                  src={
                    character.thumbnail.path +
                    "." +
                    character.thumbnail.extension
                  }
                  alt="character"
                />
              </div>
              <div className="character-container-footer">
                <h3>{character.name}</h3>
                {character.description && (
                  <button
                    onClick={() => {
                      toast.success(`${character.description} 🚀`);
                    }}
                  >
                    Plus...
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Comics;
