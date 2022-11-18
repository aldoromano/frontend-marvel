import { useLocation } from "react-router-dom";
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
      <section className="character-heading-container">
        <div className="character-heading-img-container">
          <p>{character.name}</p>
          <img
            src={character.thumbnail.path + "." + character.thumbnail.extension}
            alt="character"
          />
        </div>
      </section>
      <section className="comics-related-container">
        {data.comics.map((comics) => {
          return (
            <div key={comics._id} className="comics-related-img-container">
              <h3>{comics.title}</h3>
              <img
                src={comics.thumbnail.path + "." + comics.thumbnail.extension}
                alt="comics"
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Character;
