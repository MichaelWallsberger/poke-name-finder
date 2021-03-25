import React, { useEffect, useState } from "react";

interface LengthProps {
  guess: string;
  setGuess: any;
  functionText: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    guess: string,
    setFunction: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}

export const Length: React.FC<LengthProps> = ({
  guess,
  setGuess,
  functionText,
}) => {
  const [guessLength, setGuessLength] = useState<number>(7);

  useEffect(() => {
    let tempguess = "";
    for (let i = 0; i < guessLength; i++) {
      tempguess += " ";
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
    <div>
      <h2>Length</h2>

      <div>
        <div className="lengthOfGuess-container">
          <button onClick={() => changeLength(1)}>&#x2191;</button>
          <p className="lengthOfGuess-number">{guessLength}</p>
          <button onClick={() => changeLength(-1)}>&#x2193;</button>
        </div>

        <div className="lengthOfGuess-string">
          {guess.split("").map((el, idx) => {
            return (
              <input
                type="text"
                key={idx}
                className="lengthOfGuess-character"
                value={el}
                onChange={() => null}
                onKeyPress={(event) =>
                  functionText(event, idx, guess, setGuess)
                }
              ></input>
            );
          })}
        </div>
      </div>
    </div>
  );
};
