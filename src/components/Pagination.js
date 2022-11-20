const Pagination = ({ data, pageNumber, setPageNumber, limit, setLimit }) => {
  // Calcul du nombre de pages
  let numberOfPages = data.count / (limit ? limit : 8);

  // console.log("pagination -> ", pageNumber, limit);

  // On prévoit un tableau contenant autant d'éléments que de pages
  const tab = [];

  // En cas de trop grand nombre de pages, on change la pagination =>
  // Première page - < - << - > - >> - Dernière page
  if (numberOfPages > 20) {
    tab.push(
      <button
        key={1}
        onClick={() => {
          setPageNumber(1);
        }}
      >
        Page 1
      </button>
    );

    tab.push(
      <button
        key={2}
        onClick={() => {
          setPageNumber(pageNumber - 1);
        }}
      >
        {"<"}
      </button>
    );
    tab.push(
      <button
        key={3}
        onClick={() => {
          setPageNumber(pageNumber > 12 ? pageNumber - 10 : pageNumber);
        }}
      >
        {"<<"}
      </button>
    );
    tab.push(<button key={4}>{Math.round(pageNumber)}</button>);
    tab.push(
      <button
        key={5}
        onClick={() => {
          setPageNumber(pageNumber + 1);
        }}
      >
        {">"}
      </button>
    );
    tab.push(
      <button
        key={6}
        onClick={() => {
          setPageNumber(
            pageNumber < numberOfPages - 10 ? pageNumber + 10 : pageNumber
          );
        }}
      >
        {">>"}
      </button>
    );
    tab.push(
      <button
        key={7}
        onClick={() => {
          setPageNumber(numberOfPages);
        }}
      >
        Dernière page
      </button>
    );
  } else {
    // Pagination classique : on affiche les numéros de page
    for (let i = 0; i < numberOfPages; i++) {
      // On met à jour dynamiquement le code HTML dans le tableau
      tab.push(
        <button
          key={i}
          onClick={() => {
            setPageNumber(i + 1);
          }}
        >
          {i + 1}
        </button>
      );
    }
  }

  return (
    <>
      <div className="pagination-container">
        {tab}
        <p>Nombre d'élements / page</p>
        <input
          type="text"
          placeholder="Nombre d'éléments par page"
          value={limit}
          onChange={(event) => {
            setLimit(event.target.value);
            setPageNumber(1);
          }}
        />
      </div>

      <div className="pagination-data-container">
        [ Données : {data.count} éléments ({(pageNumber - 1) * limit + 1} /{" "}
        {pageNumber * limit}) ]
      </div>
    </>
  );
};

export default Pagination;
