import React, { useEffect, useState } from "react";
import "./App.css";
import { Icon } from '@iconify/react';
import { generateRandomColorCMYK, generateRandomColorHex, generateRandomColorHsla, generateRandomColorRGB } from './scripts/colorGenerators'
import { cmykToHex } from "./scripts/cmykToRgb";

const App = () => {
  const [activeMode, setActiveMode] = useState<string>('rgb')
  const [goodColor, setGoodColor] = useState<string>("");
  const [colors, setColors] = useState<any>();
  const [score, setScore] = useState<number>(0);
  const [topScore, setTopScore] = useState<number>(0);
  const [scoreColor, setScoreColor] = useState<string>("white");
  const [debugMode, setDebugMode] = useState<boolean>(false)

  function setupGame() {
    let colours = [];
    switch (activeMode) {
      case 'rgb':
        for (var i = 0; i < 4; i++) {
          colours.push(generateRandomColorRGB());
        }
        break;
      case 'hsla':
        for (var j = 0; j < 4; j++) {
          colours.push(generateRandomColorHsla());
        }
        break;
      case 'hex':
        for (var k = 0; k < 4; k++) {
          colours.push(generateRandomColorHex());
        }
        break;
      case 'cmyk':
        for (var l = 0; l < 4; l++) {
          colours.push(generateRandomColorCMYK());
        }
        break;
      case 'mix':
        colours.push(generateRandomColorRGB());
        colours.push(generateRandomColorHsla());
        colours.push(generateRandomColorHex());
        colours.push(generateRandomColorCMYK());
        break;
      case 'hard':
        for (var m = 0; m < 2; m++) {
        colours.push(generateRandomColorRGB());
        colours.push(generateRandomColorHsla());
        colours.push(generateRandomColorHex());
        colours.push(generateRandomColorCMYK());
        }
        colours.sort()
        break;
    
      default:
        break;
    }
    
    setGoodColor(colours[Math.floor(Math.random() * colours.length)]);
    setColors(colours);
  }

  function colorPick(color: string) {
    if (color === goodColor) {
      setScore(score + 1);
      setScoreColor("green");
      setupGame();
    } else {
      score > topScore && setTopScore(score);
      setScoreColor("red");
      setScore(0);
      setupGame();
    }
  }

  function isCmyk(str: string){
    return str.includes('cmyk')
  }

  useEffect(() => {
    setupGame()
  }, [activeMode])

  return (
    <div className="App">
      <div className="options-menu">
        <Icon className="options-menu-button" icon="carbon:restart" onClick={()=>setupGame()}/>
        <Icon className="options-menu-button" icon="carbon:debug" style={debugMode ? {color: 'green'} : {color: 'white'}} onClick={()=>setDebugMode(!debugMode)}/>
      </div>
      <div>
        <div className="score-board">High Score: {topScore}</div>
        <div className="score-board" style={{ color: scoreColor }}>
          Score: {score}
        </div>
      </div>
      <div className="game-container">
        <div className="color-square" style={isCmyk(goodColor) ? { background: cmykToHex(goodColor)} : {background: goodColor}}>
          {debugMode && goodColor}
          </div>
        <div className="buttons-container">
          {colors?.map((value: any, index: number) => {
            return (
              <button key={index} onClick={() => colorPick(value)} className="game-button" style={debugMode ? (isCmyk(value) ? {background: cmykToHex(value)} : {background: value}) : {}}>
                {value}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h3>MODES</h3>
        <div className="modes-buttons">
          <button className="mode-button" onClick={()=> setActiveMode('rgb')} style={activeMode === 'rgb' ? {background: 'green'} : {opacity: .5}}>RGB</button>
          <button className="mode-button" onClick={()=> setActiveMode('hsla')} style={activeMode === 'hsla' ? {background: 'green'} : {opacity: .5}}>HSLA</button>
          <button className="mode-button" onClick={()=> setActiveMode('hex')} style={activeMode === 'hex' ? {background: 'green'} : {opacity: .5}}>HEX</button>
          <button className="mode-button" onClick={()=> setActiveMode('cmyk')} style={activeMode === 'cmyk' ? {background: 'green'} : {opacity: .5}}>CMYK</button>
          <button className="mode-button" onClick={()=> setActiveMode('mix')} style={activeMode === 'mix' ? {background: 'green'} : {opacity: .5}}>MIX</button>
          <button className="mode-button" onClick={()=> setActiveMode('hard')} style={activeMode === 'hard' ? {background: 'green', color: 'red'} : {opacity: .5, color:'red'}}>HARD</button>
        </div>
      </div>
    </div>
  );
};

export default App;
