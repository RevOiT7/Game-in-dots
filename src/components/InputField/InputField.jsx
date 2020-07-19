import React from "react";

import "./InputField.scss";

export const InputField = ({
  makeInterval,
  playerName,
  setPlayerName,
  winner,
  isActive,
}) => (
  <form onSubmit={makeInterval}>
    <input
      type="text"
      value={playerName}
      onChange={(e) => setPlayerName(e.target.value)}
      disabled={isActive}
      required
    />
    <input
      type="submit"
      value={!winner ? "PLAY" : "PLAY AGAIN"}
      disabled={isActive}
    />
  </form>
);
