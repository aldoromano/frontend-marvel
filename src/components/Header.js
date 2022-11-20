import logo from "../assets/images/marvel.png";
import { useLocation } from "react-router-dom";
const Header = () => {
  const location = useLocation();

  return (
    <header>
      <div className="header-container container">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>

        <div className="header-title">
          {location.pathname === "/comics"
            ? "Liste des BD MARVEL"
            : "Liste des personnages MARVEL"}
        </div>
        <div className="header-avatar-container"></div>
      </div>
    </header>
  );
};

export default Header;
