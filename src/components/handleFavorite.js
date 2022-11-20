import Cookies from "js-cookie";

const handleFavorite = (id, tabFavorite, setTabFavorite, cookieName) => {
  // Gestion du cookie
  const tab = [...tabFavorite];
  const indexId = tab.indexOf(id);

  // Si l'id est référencé dans les cookies, on souhaite enlever le favori
  if (indexId >= 0) {
    tab.splice(indexId, 1);
    // S'il n'existe pas, on l'ajoute
  } else {
    tab.push(id);
  }

  // MAJ du state
  setTabFavorite(tab);

  // MAJ du cookie
  Cookies.set(cookieName, JSON.stringify(tab));
};

export default handleFavorite;
