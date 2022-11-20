import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Character = ({ urlBase }) => {
  const location = useLocation();
  const { character } = location.state;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlBase}/comics/${character._id}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Erreur -> ", error);
      }
    };

    fetchData();
  }, [urlBase, character._id]);

  return isLoading ? (
    <p>Loading </p>
  ) : (
    <div className="character-detail-container">
      <nav className="character-nav-container">
        <Link to="/">
          <button> Personnages </button>
        </Link>

        <Link to="/comics">
          <button> Comics </button>
        </Link>
      </nav>
      <section className="character-heading-container">
        <div className="character-heading-img-container">
          <img
            src={character.thumbnail.path + "." + character.thumbnail.extension}
            alt="character"
          />{" "}
          <p>{character.name}</p>
        </div>
      </section>
      <section className="comics-related-container">
        {data.comics.map((comics) => {
          return (
            <div key={comics._id} className="comics-related-img-container">
              <img
                src={comics.thumbnail.path + "." + comics.thumbnail.extension}
                alt="comics"
              />{" "}
              <h3>{comics.title}</h3>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Character;
