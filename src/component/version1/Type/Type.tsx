import React, { useEffect, useState } from "react";
import PokemonTypes from "../../../helpers/PokemonTypes.json";
import typeColors from "../../../helpers/TypeColor";
import { craeteTypeName } from "../../../helpers/Utility";
import { setActivation } from "../../../helpers/Utility";

interface typeProps {
  typeArray: string[];
  setTypeArray: React.Dispatch<React.SetStateAction<string[]>>;
}

interface pokemonTypes {
  type: string;
}

interface button {
  type: pokemonTypes;
  activate: boolean;
}

export const Type: React.FC<typeProps> = ({ typeArray, setTypeArray }) => {
  const [typeButtons, setTypeButtons] = useState<button[]>([]);

  // give the array an attribute if their active or not
  useEffect(() => {
    let tempContainer: button[] = [];

    PokemonTypes.forEach((el: pokemonTypes) => {
      tempContainer.push({
        type: el,
        activate: setActivation(el.type, typeArray),
      });
    });

    setTypeButtons(tempContainer);
  }, [typeArray]);

  // update the current active types on the parent element
  const updateType = (el: button) => {
    el.activate = !el.activate; // update state

    // update Buttons
    let newArr = [...typeButtons]; // copy array
    setTypeButtons(newArr); // it's a new array :), therefore it will update

    // remove element
    if (!el.activate) {
      typeArray.splice(
        typeArray.findIndex(
          (type) =>
            type.toLocaleLowerCase() === el.type.type.toLocaleLowerCase()
        ),
        1
      );
    }
    // add element
    else {
      typeArray.push(el.type.type.toLocaleLowerCase());
    }
  };

  // activate all types
  const activateAllTypes = () => {
    let newArray: string[] = [];

    PokemonTypes.forEach((el) => {
      newArray.push(el.type.toLocaleLowerCase());
    });

    setTypeArray(newArray);
  };

  // deactivate all types
  const deactiveAllTypes = () => {
    let newArray: string[] = [];

    setTypeArray(newArray);
  };

  return (
    <div>
      <h2>Type</h2>

      <div>
        <div className="btn-header">
          <button onClick={() => activateAllTypes()}>All</button>
          <button onClick={() => deactiveAllTypes()}>None</button>
        </div>

        {typeButtons.map((el: button, idx: number) => {
          return (
            <button
              className={el.activate ? "btn-active" : "btn-inactive"}
              key={idx}
              style={{
                backgroundColor: typeColors[el.type.type.toLowerCase()],
              }}
              onClick={() => updateType(el)}
            >
              {craeteTypeName(el.type.type)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
