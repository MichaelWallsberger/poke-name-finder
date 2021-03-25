import React from "react";
import { InterfacePokemon } from "../../../helpers/interfaces";
import { createImgUrl } from "../../../helpers/Utility";

interface PokemonsProps {
  pokemons: InterfacePokemon[] | undefined;
  usePicture: boolean;
}

export const Pokemons: React.FC<PokemonsProps> = ({ pokemons, usePicture }) => {
  return (
    <div>
      <h2>Pokemons: {pokemons?.length}</h2>

      <div className={usePicture ? "pokemon-image-container" : ""}>
        {pokemons?.map((pokemon: InterfacePokemon, idx) => {
          return usePicture ? (
            <div key={idx} className="pokemon-image-card">
              <img
                className="pokemon-img"
                src={createImgUrl(pokemon)}
                alt="img"
              />
              <p>{pokemon.name}</p>
            </div>
          ) : (
            <div key={idx}>
              <p>{pokemon.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
