import React from "react";

interface MenuProps {
  nextPage: (page: string) => void;
}

export const Menu: React.FC<MenuProps> = ({ nextPage }) => {
  return (
    <div className="version2-page-container">
      <h2 className="page2-title">Menu</h2>
      <div className="search-criteria-container">
        <button onClick={() => nextPage("generation")}>Generation</button>
        <button onClick={() => nextPage("type")}>Type</button>
        <button onClick={() => nextPage("color")}>Color</button>
        <button onClick={() => nextPage("name")}>Name</button>
        <button onClick={() => nextPage("search")}>Search</button>
      </div>
    </div>
  );
};
