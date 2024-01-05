import React from 'react';
import DrumPad from './components/DrumPad';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="drum-machine">
        {[...Array(16)].map((_, i) => (
          <DrumPad key={i} label={`Pad ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default App;
