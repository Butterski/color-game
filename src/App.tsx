import React, { useEffect, useState } from "react";
import "./App.css";
import Picker from './games/Picker';
import Maker from "./games/Maker";
import { Icon } from '@iconify/react';

const App = () => {
  const [gameChoosen, setGameChoosen] = useState<string>('picker')
  return(
  <div className="App">
    <div className="gamePicker">
      <button onClick={()=>setGameChoosen('picker')} style={gameChoosen === 'picker' ? {background: 'green'} : {}}>Picker <Icon icon="mingcute:color-picker-line" /></button>
      <button onClick={()=>setGameChoosen('maker')} style={gameChoosen === 'maker' ? {background: 'green'} : {}}>Maker <Icon icon="codicon:symbol-color" /></button>
      <button onClick={()=>setGameChoosen('soon')} style={gameChoosen === 'soon' ? {background: 'green'} : {}} disabled>Soon <Icon icon="emojione:soon-arrow" /></button>
    </div>
    {gameChoosen === 'picker' && <Picker />}
    {gameChoosen === 'maker' && <Maker />}
  </div>
  );
};

export default App;
