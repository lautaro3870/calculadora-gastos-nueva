import React from 'react';
import './App.css';
import Calculadora from './components/Calculadora';
import Rutas from './Rutas';
import AutoLayoutExample from './components/AutoLayoutExample';
import BasicExample from './components/BasicExample';

function App() {
  return (
    <div className="App">
      <Rutas />
      {/* <AutoLayoutExample /> */}
      {/* <BasicExample /> */}
    </div>
  );
}

export default App;
