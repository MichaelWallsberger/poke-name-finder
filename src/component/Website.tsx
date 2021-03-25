import React, { useState } from "react";
import { PokeGuess } from "./version1/PokeGuess";
import { PokeGuess2 } from "./version2/PokeGuess2";

interface WebsiteProps {}

export const Website: React.FC<WebsiteProps> = ({}) => {
  const [showVersion, setShowVersion] = useState<string>("v2");

  const setVersion = (version: string) => {
    setShowVersion(version);
  };

  return (
    <div>
      {showVersion === "v1" ? (
        <PokeGuess setVersion={setVersion} />
      ) : showVersion === "v2" ? (
        <PokeGuess2 setVersion={setVersion} />
      ) : (
        <div>sorry to say but something went wrong</div>
      )}
    </div>
  );
};
