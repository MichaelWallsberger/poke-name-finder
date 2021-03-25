import React, { useEffect, useState } from "react";
import PokemonColors from "../../../../helpers/PokemonColors.json";
import { setActivation } from "../../../../helpers/Utility";

interface ColorProps {
  nextPage: (page: string) => void;
  colorArray: string[];
  setColorArray: React.Dispatch<React.SetStateAction<string[]>>;
}

interface pokeColor {
  name: string;
  color: string;
}

interface button {
  type: pokeColor;
  activate: boolean;
}

export const Color: React.FC<ColorProps> = ({
  nextPage,
  colorArray,
  setColorArray,
}) => {
  const [colorButtons, setColorButtons] = useState<button[]>([]);

  useEffect(() => {
    let tempContainer: button[] = [];

    PokemonColors.forEach((el: pokeColor) => {
      tempContainer.push({
        type: el,
        activate: setActivation(el.name, colorArray),
      });
    });

    setColorButtons(tempContainer);
  }, [colorArray]);

  // update the current active types on the parent element
  const updateType = (el: button) => {
    el.activate = !el.activate; // update state

    // update Buttons
    let newArr = [...colorButtons]; // copy array
    setColorButtons(newArr); // it's a new array :), therefore it will update

    // remove element
    if (!el.activate) {
      colorArray.splice(
        colorArray.findIndex(
          (type) =>
            type.toLocaleLowerCase() === el.type.name.toLocaleLowerCase()
        ),
        1
      );
    }
    // add element
    else {
      colorArray.push(el.type.name.toLocaleLowerCase());
    }
  };

  // activate all colors
  const activateAllTypes = () => {
    let newArray: string[] = [];

    PokemonColors.forEach((el) => {
      newArray.push(el.name.toLocaleLowerCase());
    });

    setColorArray(newArray);
  };

  // deactivate all colors
  const deactiveAllColors = () => {
    let newArray: string[] = [];

    setColorArray(newArray);
  };
  return (
    <div className="version2-page-container">
      <button className="back-button" onClick={() => nextPage("menu")}>
        &#60; &#60;
      </button>
      <h2 className="page2-title">Color</h2>

      <div>
        <div className="btn-header2">
          <button onClick={() => activateAllTypes()}>All</button>
          <button onClick={() => deactiveAllColors()}>None</button>
        </div>

        <div className="search-criteries-button-container">
          {colorButtons.map((el: button, idx: number) => {
            return (
              <button
                className={
                  "search-criteries-button " +
                  (el.activate ? "btn-active" : "btn-inactive")
                }
                key={idx}
                style={{ backgroundColor: el.type.color }}
                onClick={() => updateType(el)}
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
