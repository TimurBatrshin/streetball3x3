import React from 'react';
import './App.css';
import JokeGenerator from './components/JokeGenerator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Joke Generator</h1>
        <JokeGenerator />
      </header>
      <header className="App-header">
        <h1>Digital Clock</h1>
        <DigitalClock />
      </header>
    </div>
  );
}

export default App;