import React, { useEffect, useState } from "react";
import PokemonGenerations from "../../../helpers/PokemonGenerations.json";
import { setActivationGeneration } from "../../../helpers/Utility";

interface GenerationProps {
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
    <div>
      <h2>Generation</h2>

      <div>
        <div className="btn-header">
          <button onClick={() => activateAllTypes()}>All</button>
        </div>

        {generationButtons.map((el: button, idx: number) => {
          return (
            <button
              className={el.activate ? "btn-active" : "btn-inactive"}
              key={idx}
              onClick={() => updateGeneration(el)}
            >
              {el.type.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
