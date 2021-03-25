import React from "react";

interface SearchProps {
  nextPage: (page: string) => void;
  pokeSearch: () => void;
  usePicture: boolean;
  setUsePicture: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Search: React.FC<SearchProps> = ({
  nextPage,
  pokeSearch,
  usePicture,
  setUsePicture,
}) => {
  return (
    <div className="version2-page-container">
      <button className="back-button" onClick={() => nextPage("menu")}>
        &#60; &#60;
      </button>

      <h2 className="page2-title">Search</h2>

      <div className="search-container">
        <div className="generator-options switches">
          <li>
            <input
              type="checkbox"
              id="1"
              checked={usePicture}
              onChange={() => setUsePicture(!usePicture)}
            />
            <label htmlFor="1">
              <span className="checkbox-text">Picture:</span>
              <span></span>
            </label>
          </li>
        </div>

        <div className="search-btn-div">
          <button
            className="search-btn"
            onClick={() => {
              pokeSearch();
              nextPage("pokemons");
            }}
          >
            Start Search
          </button>
        </div>
      </div>
    </div>
  );
};
