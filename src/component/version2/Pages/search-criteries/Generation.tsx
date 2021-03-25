import React, { useEffect, useState } from "react";
import PokemonGenerations from "../../../../helpers/PokemonGenerations.json";
import { setActivationGeneration } from "../../../../helpers/Utility";

interface GenerationProps {
  nextPage: (page: string) => void;
  generationArray: number[];
  setGenerationArray: React.Dispatch<React.SetStateAction<number[]>>;
}

interface pokemonGeneration {
  generation: number;
  name: string;
  backgroundStyle: string;
}

interface button {
  type: pokemonGeneration;
  activate: boolean;
}

export const Generation: React.FC<GenerationProps> = ({
  nextPage,
  generationArray,
  setGenerationArray,
}) => {
  const [generationButtons, setGenerationButtons] = useState<button[]>([]);

  useEffect(() => {
    let tempContainer: button[] = [];

    PokemonGenerations.forEach((el: pokemonGeneration) => {
      tempContainer.push({
        type: el,
        activate: setActivationGeneration(el.generation, generationArray),
      });
    });

    setGenerationButtons(tempContainer);
  }, [generationArray]);

  // update the current active generation on the parent element
  const updateGeneration = (el: button) => {
    el.activate = !el.activate; // update state

    // update Buttons
    let newArr = [...generationButtons]; // copy array
    setGenerationButtons(newArr); // it's a new array :), therefore it will update

    // remove element
    if (!el.activate) {
      generationArray.splice(
        generationArray.findIndex((type) => type === el.type.generation),
        1
      );
    }
    // add element
    else {
      generationArray.push(el.type.generation);
    }
  };

  // activate all colors
  const activateAllTypes = () => {
    let newArray: number[] = [];

    PokemonGenerations.forEach((el) => {
      newArray.push(el.generation);
    });

    setGenerationArray(newArray);
  };

  return (
    <div className="version2-page-container">
      <button className="back-button" onClick={() => nextPage("menu")}>
        &#60; &#60;
      </button>
      <h2 className="page2-title">Generation</h2>

      <div>
        <div className="btn-header2">
          <button onClick={() => activateAllTypes()}>All</button>
        </div>

        <div className="search-criteries-button-container">
          {generationButtons.map((el: button, idx: number) => {
            return (
              <button
                className={
                  "search-criteries-button search-criteries-generation-button " +
                  (el.activate ? "btn-active" : "btn-inactive")
                }
                style={{ background: el.type.backgroundStyle }}
                key={idx}
                onClick={() => updateGeneration(el)}
              >
                {el.type.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
