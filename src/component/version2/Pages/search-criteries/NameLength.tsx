import React, { useEffect, useState } from "react";

interface NameLengthProps {
  nextPage: (page: string) => void;
  guess: string;
  setGuess: any;
  setText: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    previousText: string,
    guess: string,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}

export const NameLength: React.FC<NameLengthProps> = ({
  nextPage,
  guess,
  setGuess,
  setText,
}) => {
  const [guessLength, setGuessLength] = useState<number>(guess.length);
  const [debugText, setDebugText] = useState<
    React.ChangeEvent<HTMLInputElement>
  >();

  useEffect(() => {
    let tempguess = "";

    for (let i = 0; i < guessLength; i++) {
      if (guess.charAt(i) != undefined && guess.charAt(i) != "") {
        tempguess += guess.charAt(i);
      } else {
        tempguess += " ";
      }
    }

    setGuess(tempguess);
  }, [guessLength]);

  // increase or decrease the length of the word
  const changeLength = (n: number) => {
    // add
    if (n > 0 && guessLength + n <= 15) {
      setGuessLength(guessLength + n);
    }
    // subtract
    else if (n < 0 && guessLength + n > 0) {
      setGuessLength(guessLength + n);
    }
  };

  return (
    <div className="version2-page-container">
      <button className="back-button" onClick={() => nextPage("menu")}>
        &#60; &#60;
      </button>
      <h2 className="page2-title">Name</h2>

      <div>
        <div className="lengthOfGuess-container2">
          <button onClick={() => changeLength(1)}>&#x2191;</button>
          <p className="lengthOfGuess-number2">{guessLength}</p>
          <button onClick={() => changeLength(-1)}>&#x2193;</button>
        </div>

        <div className="lengthOfGuess-string2">
          {guess.split("").map((el, idx) => {
            return (
              <input
                type="text"
                key={idx}
                className="lengthOfGuess-character2"
                value={el}
                onChange={(event) => setText(event, idx, el, guess, setGuess)}
              ></input>
            );
          })}
        </div>
      </div>
    </div>
  );
};
