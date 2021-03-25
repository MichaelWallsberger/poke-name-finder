import React from "react";

interface TitlepageProps {
  setVersion: (version: string) => void;
  nextPage: (page: string) => void;
}

export const Titlepage: React.FC<TitlepageProps> = ({
  setVersion,
  nextPage,
}) => {
  return (
    <div className="title-container">
      <div className="title2-background" onClick={() => nextPage("menu")}></div>
      <h1 className="title2-header">Poké-Name-Finder</h1>
      <div className="page-versions2-div">
        <p className="page-version2" onClick={() => setVersion("v1")}>
          v1
        </p>
        <p className="page-version2-seperator">/</p>
        <p
          className="page-version2 page-version2-active"
          onClick={() => setVersion("v2")}
        >
          v2
        </p>
      </div>
      <p className="click-to-start">Click to start</p>
    </div>
  );
};
