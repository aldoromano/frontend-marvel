import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Comics = ({ urlBase, limit, skip, name }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Requête axios vers backend REACTEUR
      const response = await axios.get(`${urlBase}/comics?limit=&skip=&title=`);

      console.log(response.data);
      // setData(data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [urlBase, limit, skip, name]);

  return <div>COMICS</div>;
};

export default Comics;
