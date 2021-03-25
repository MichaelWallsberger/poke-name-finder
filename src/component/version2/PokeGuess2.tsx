import React, { useEffect, useState } from "react";
import { Titlepage } from "./Pages/Titlepage";
import { Types } from "./Pages/search-criteries/Types";
import { Generation } from "./Pages/search-criteries/Generation";
import { Color } from "./Pages/search-criteries/Color";
import { NameLength } from "./Pages/search-criteries/NameLength";
import { Search } from "./Pages/Search";
import { Pokemons } from "./Pages/Pokemons";
import { Menu } from "./Pages/Menu";
import { InterfacePokemon } from "../../helpers/interfaces";
import { setText, setText2, pokeSearch } from "../../helpers/Utility";
import PokemonTypes from "../../helpers/PokemonTypes.json";
import PokemonColors from "../../helpers/PokemonColors.json";
import PokemonGenerations from "../../helpers/PokemonGenerations.json";

interface PokeGuess2Props {
  setVersion: (version: string) => void;
}

export const PokeGuess2: React.FC<PokeGuess2Props> = ({ setVersion }) => {
  const [activePage, setActivePage] = useState<string>("title");
  const [typesActive, setTypesActive] = useState<string[]>([]);
  const [colorsActive, setColorsActive] = useState<string[]>([]);
  const [generationsActive, setGenerationsActive] = useState<number[]>([]);
  const [guess, setGuess] = useState<string>("       ");
  const [usePicture, setUsePicture] = useState<boolean>(true);
  const [searchedPokemons, setSearchedPokemons] = useState<
    InterfacePokemon[] | undefined
  >();

  useEffect(() => {
    document.body.style.all = "unset";
    document.body.style.color = "black";

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

  const nextPage = (page: string) => {
    setActivePage(page);
  };

  const searchForPokemon = () => {
    pokeSearch(
      typesActive,
      colorsActive,
      generationsActive,
      guess,
      setSearchedPokemons
    );
  };

  // render the page that is currently active
  const getPage = () => {
    if (activePage === "title")
      return <Titlepage setVersion={setVersion} nextPage={nextPage} />;
    else if (activePage === "menu") {
      return <Menu nextPage={nextPage} />;
    } else if (activePage === "generation")
      return (
        <Generation
          nextPage={nextPage}
          generationArray={generationsActive}
          setGenerationArray={setGenerationsActive}
        />
      );
    else if (activePage === "type")
      return (
        <Types
          nextPage={nextPage}
          typeArray={typesActive}
          setTypeArray={setTypesActive}
        />
      );
    else if (activePage === "color") {
      return (
        <Color
          nextPage={nextPage}
          colorArray={colorsActive}
          setColorArray={setColorsActive}
        />
      );
    } else if (activePage === "name") {
      return (
        <NameLength
          nextPage={nextPage}
          guess={guess}
          setGuess={setGuess}
          setText={setText2}
        />
      );
    } else if (activePage === "search") {
      return (
        <Search
          nextPage={nextPage}
          pokeSearch={searchForPokemon}
          usePicture={usePicture}
          setUsePicture={setUsePicture}
        />
      );
    } else if (activePage === "pokemons") {
      return (
        <Pokemons
          nextPage={nextPage}
          pokemons={searchedPokemons}
          usePicture={usePicture}
        />
      );
    } else {
      return (
        <div>
          <p> you teleported to the wrong place </p>
          <button onClick={() => setActivePage("title")}>Warp to Title</button>
        </div>
      );
    }
  };

  return <div className="title2-body">{getPage()}</div>;
};
