import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { React, useState } from "react";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";

// Composants
import Header from "./components/Header";

// Pages
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Character from "./pages/Character";

//const urlBase = "https://lereacteur-marvel-api.herokuapp.com";
const urlBase = "http://localhost:4000";

function App() {
  const [limitCharacter, setLimitCharacter] = useState(100);
  const [pageCharacter, setPageCharacter] = useState(1);
  const [limitComics, setLimitComics] = useState(100);
  const [pageComics, setPageComics] = useState(1);
  return (
    <Router>
      <Toaster />
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              urlBase={urlBase}
              limit={limitCharacter}
              setLimit={setLimitCharacter}
              pageNumber={pageCharacter}
              setPageNumber={setPageCharacter}
            ></Characters>
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              urlBase={urlBase}
              limit={setLimitComics}
              skip={setPageComics}
            ></Comics>
          }
        />
        <Route
          path="/character"
          element={<Character urlBase={urlBase}></Character>}
        />
      </Routes>
    </Router>
  );
}

export default App;
