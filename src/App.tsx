import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [goodColor, setGoodColor] = useState<string>("");
  const [colors, setColors] = useState<any>();
  const [score, setScore] = useState<number>(0);

  function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  function generateRandomColorHex() {
    var arr = [];
    for (var i = 0; i < 3; i++) {
      arr.push(Math.floor(Math.random() * 256));
    }
    return (rgbToHex(arr[0], arr[1], arr[2])).toUpperCase();
  }

  function setupGame() {
    let colours = [];
    for (var i = 0; i < 4; i++) {
      colours.push(generateRandomColorHex());
    }
    setGoodColor(colours[Math.floor(Math.random() * 4)]);
    setColors(colours);
  }

  function colorPick(color: string) {
    if (color === goodColor) {
      setScore(score + 1);
      setupGame();
    } else {
      setScore(0);
      setupGame();
    }
  }

  useEffect(() => {
    setupGame();
  }, []);

  return (
    <div className="App">
      <div className="score-board">Score: {score}</div>
      <div className="color-square" style={{ background: goodColor }}>
        {goodColor}
      </div>
      <div>
        {colors?.map((value: any, index: number) => {
          return (
            <button key={index} onClick={() => colorPick(value)}>
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;
