import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [randomWord, setRandomWord] = useState(0);
  
  useEffect(() => {
    fetch('/chinese').then(res => res.json()).then(data => {
      setRandomWord(data.word);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>A random word of the day: {randomWord}.</p>
      </header>
    </div>
  );
}

export default App;
