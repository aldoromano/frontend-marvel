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
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);

  return (
    <Router>
      <Toaster />
      <Header></Header>
      <Routes>
        {/* <Route path="/" element={<Home></Home>} /> */}
        <Route
          path="/"
          element={
            <Characters
              urlBase={urlBase}
              limit={limit}
              skip={skip}
            ></Characters>
          }
        />
        <Route
          path="/comics"
          element={
            <Comics urlBase={urlBase} limit={limit} skip={skip}></Comics>
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
