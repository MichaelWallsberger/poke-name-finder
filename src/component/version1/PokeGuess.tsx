import React, { useEffect, useState } from "react";
import { Type } from "./Type/Type";
import { Color } from "./Color/Color";
import { Length } from "./Length/Length";
import { Generation } from "./Generation/Generation";
import { Pokemons } from "./Pokemons/Pokemons";
import { setText, pokeSearch } from "../../helpers/Utility";
import { InterfacePokemon } from "../../helpers/interfaces";
import PokemonTypes from "../../helpers/PokemonTypes.json";
import PokemonColors from "../../helpers/PokemonColors.json";
import PokemonGenerations from "../../helpers/PokemonGenerations.json";

interface PokeGuessProps {
  setVersion: (version: string) => void;
}

export const PokeGuess: React.FC<PokeGuessProps> = ({ setVersion }) => {
  const [typesActive, setTypesActive] = useState<string[]>([]);
  const [colorsActive, setColorsActive] = useState<string[]>([]);
  const [generationsActive, setGenerationsActive] = useState<number[]>([]);
  const [guess, setGuess] = useState<string>("");
  const [usePicture, setUsePicture] = useState<boolean>(true);
  const [searchedPokemons, setSearchedPokemons] = useState<
    InterfacePokemon[] | undefined
  >();

  // sets up all the types, colors and generations
  useEffect(() => {
    // background
    document.body.style.all = "unset";
    document.body.style.backgroundColor = "#f0808f";
    document.body.style.textAlign = "center";

    // types
    let tempTypes: string[] = [];
    PokemonTypes.forEach((el) => {
      tempTypes.push(el.type);
    });

    // colors
    let tempColors: string[] = [];
    PokemonColors.forEach((el) => {
      tempColors.push(el.name);
    });

    // generations
    let tempGenerations: number[] = [];
    PokemonGenerations.forEach((el) => {
      tempGenerations.push(el.generation);
    });

    setTypesActive(tempTypes);
    setColorsActive(tempColors);
    setGenerationsActive(tempGenerations);
  }, []);

  return (
    <div className="version1">
      <div className="page-title">
        <h1>Poke-Name-Finder</h1>
        <div className="page-versions-div">
          <p
            className="page-version page-version-active"
            onClick={() => setVersion("v1")}
          >
            v1
          </p>
          <p className="page-version-seperator">/</p>
          <p className="page-version" onClick={() => setVersion("v2")}>
            v2
          </p>
        </div>
      </div>

      <div className="app-body">
        <div className="search-criteria-div">
          <Type typeArray={typesActive} setTypeArray={setTypesActive} />
          <Color colorArray={colorsActive} setColorArray={setColorsActive} />
          <Generation
            generationArray={generationsActive}
            setGenerationArray={setGenerationsActive}
          />
        </div>
        <Length guess={guess} setGuess={setGuess} functionText={setText} />

        <div className="search-container">
          <div className="search-btn-div">
            <div className="search-btn-circle"></div>
            <button
              className="search-btn"
              onClick={() => {
                pokeSearch(
                  typesActive,
                  colorsActive,
                  generationsActive,
                  guess,
                  setSearchedPokemons
                );
              }}
            >
              Search
            </button>
          </div>
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
        </div>

        <Pokemons pokemons={searchedPokemons} usePicture={usePicture} />
      </div>
    </div>
  );
};
