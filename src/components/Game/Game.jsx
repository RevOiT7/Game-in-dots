import React, { useEffect, useState, useCallback } from "react";
import * as api from "../../api";
import { Dropdown } from "../Dropdown/Dropdown";
import { InputField } from "../InputField/InputField";
import { GameField } from "./GameField";

import {
  INITIAL_MODE,
  INITIAL_DELAY,
  COMPUTER_WIN,
  PLAYER_WIN,
  CELL_COLOR,
} from "../../constants";
import {
  arrayGenerator,
  dateFormatter,
  makeGetRandomElement,
} from "../../utils";

import "./Game.scss";

export const Game = () => {
  const [settings, setSettings] = useState({});
  const [selectedMode, setSelectedMode] = useState(INITIAL_MODE);
  const [delay, setDelay] = useState(INITIAL_DELAY);
  const [array, setArray] = useState([]);
  const [timerID, setTimerID] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [winner, setWinner] = useState("");
  const [isFieldActive, setIsFieldActive] = useState(true);

  let countRed = array.filter((item) => item.isHiglight === CELL_COLOR.RED)
    .length;
  let countGreen = array.filter((item) => item.isHiglight === CELL_COLOR.GREEN)
    .length;

  useEffect(() => {
    api.fetchSettings().then(setSettings);
  }, []);

  useEffect(() => {
    setArray(arrayGenerator(selectedMode));
  }, [selectedMode]);

  useEffect(() => {
    if (!winner || winner === COMPUTER_WIN) {
      return;
    }
    const date = dateFormatter.format(new Date());
    api.postWinner(playerName, date);
  }, [playerName, winner]);

  useEffect(() => {
    return () => window.clearInterval(timerID);
  }, [timerID]);

  const makeInterval = useCallback(() => {
    if (winner) {
      setArray(arrayGenerator(selectedMode));
      setWinner("");
      setPlayerName("");
    }
    let getRandomElement = makeGetRandomElement(array);

    let setTimer = setInterval(() => {
      let rand = getRandomElement().ID;
      let newArr = array.map((item) => {
        if (
          item.isHiglight === CELL_COLOR.BLUE &&
          item.isHiglight !== CELL_COLOR.GREEN
        ) {
          item.isHiglight = CELL_COLOR.RED;
        }
        if (
          item.ID === rand &&
          item.isHiglight !== CELL_COLOR.BLUE &&
          item.isHiglight !== CELL_COLOR.GREEN &&
          item.isHiglight !== CELL_COLOR.GREEN
        ) {
          item.isHiglight = CELL_COLOR.BLUE;
        }
        return item;
      });

      if (!winner) {
        setArray(newArr);
      }
      setTimerID(setTimer);
    }, delay);
    if (!winner) {
      setIsFieldActive(false);
    }
  }, [array, delay, selectedMode, winner]);

  if (countRed > array.length / 2) {
    window.clearInterval(timerID);
    if (!winner) {
      setWinner(COMPUTER_WIN);
      setIsFieldActive(true);
    }
  }
  if (countGreen > array.length / 2) {
    window.clearInterval(timerID);
    if (!winner) {
      setWinner(PLAYER_WIN);
      setIsFieldActive(true);
    }
  }

  const onButtonClick = useCallback(
    (id) => {
      let newArr = array.map((item) => {
        if (item.ID === id && item.isHiglight === CELL_COLOR.BLUE) {
          item.isHiglight = CELL_COLOR.GREEN;
        }
        return item;
      });
      setArray(newArr);
    },
    [array]
  );

  const handleDropdown = useCallback((event) => {
    setSelectedMode(JSON.parse(event.target.value).field);
    setDelay(JSON.parse(event.target.value).delay);
  }, []);

  return (
    <div className="game">
      <div className="game-settings">
        <Dropdown
          handleDropdown={handleDropdown}
          settings={settings}
          isActive={!isFieldActive}
        />
        <InputField
          makeInterval={makeInterval}
          playerName={playerName}
          setPlayerName={setPlayerName}
          winner={winner}
          isActive={!isFieldActive}
        />
      </div>
      <span>
        {winner === COMPUTER_WIN && "Computer won: Try again!"}
        {winner === PLAYER_WIN && `${playerName} won!`}
      </span>
      <GameField
        fields={array}
        onButtonClick={onButtonClick}
        selectedMode={selectedMode}
      />
    </div>
  );
};
