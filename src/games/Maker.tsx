import React, { useState, useEffect } from "react";
import "./maker.css";
import { Icon } from "@iconify/react";
import { generateRandomColorRGB } from "../scripts/colorGenerators";

const Maker = () => {
  const [debugMode, setDebugMode] = useState<boolean>(false);
  const [goodColor, setGoodColor] = useState<string>("");
  const [inputColor, setInputColor] = useState<{
    r: number;
    g: number;
    b: number;
  }>({ r: 255, g: 255, b: 255 });
  const [tries, setTries] = useState<number>(3);
  const [checkerVisisbility, setCheckerVisisbility] = useState<boolean>(false);
  const [lostGame, setLostGame] = useState<boolean>(false);
  const [wonGame, setWonGame] = useState<boolean>(false)

  function setupGame() {
    setGoodColor(generateRandomColorRGB());
    setLostGame(false);
    setWonGame(false);
    setCheckerVisisbility(false);
    setTries(3);
  }
  useEffect(() => {
    setupGame();
  }, []);

  useEffect(() => {
    if(`rgb(${inputColor.r}, ${inputColor.g}, ${inputColor.b})` === goodColor){
      setWonGame(true)
    }
    if (checkerVisisbility && wonGame) {
      tries <= 0 ? setLostGame(true) : setTries(tries - 1);
    }
  }, [checkerVisisbility]);

  return (
    <div className="Maker">
      <div className="options-menu">
        <Icon
          className="options-menu-button"
          icon="carbon:restart"
          onClick={() => setupGame()}
        />
        <Icon
          className="options-menu-button"
          icon="carbon:debug"
          style={debugMode ? { color: "green" } : { color: "white" }}
          onClick={() => setDebugMode(!debugMode)}
        />
      </div>
      <div className="game-container">
        Lives: {tries}
        {lostGame && (<p style={{color: 'red'}}>Lost Game!</p>)}
        {wonGame && (<p style={{color: 'green'}}>Congratulations you win!</p>)}
        <div className="color-square" style={{ background: goodColor }}>
          {(debugMode || lostGame || wonGame) && goodColor}
          <div
            className="input-color-square"
            style={
              checkerVisisbility
                ? {
                    background: `rgb(${inputColor.r}, ${inputColor.g}, ${inputColor.b})`,
                    display: "block",
                  }
                : { display: "none" }
            }
          ></div>
        </div>
        <div className="inputs-container">
          <div className="input-container">
            <input
              type="number"
              min="0"
              max="255"
              step="1"
              placeholder="red"
              onChange={(e) =>
                setInputColor({ ...inputColor, r: parseInt(e.target.value) })
              }
            />
            R
          </div>
          <div className="input-container">
            <input
              type="number"
              min="0"
              max="255"
              step="1"
              placeholder="green"
              onChange={(e) =>
                setInputColor({ ...inputColor, g: parseInt(e.target.value) })
              }
            />
            G
          </div>
          <div className="input-container">
            <input
              type="number"
              min="0"
              max="255"
              step="1"
              placeholder="blue"
              onChange={(e) =>
                setInputColor({ ...inputColor, b: parseInt(e.target.value) })
              }
            />
            B
          </div>
        </div>
        <button
          className="check-button"
          onClick={() => setCheckerVisisbility(!checkerVisisbility)}
          disabled={(lostGame || wonGame)}
        >
          CHECK
        </button>
        {(lostGame || wonGame) && (
          <button
            className="check-button"
            onClick={() => {
              setupGame();
            }}
          >
            NEXT GAME
          </button>
        )}
      </div>
    </div>
  );
};

export default Maker;
