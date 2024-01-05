import React, { useEffect } from 'react';
import DrumPad from './components/DrumPad';
import './App.css';
import sampleBanks from './components/SampleBanks';

function App() {
  const currentBank = sampleBanks.bank1;

  const playSoundByKey = (key) => {
    const sample = currentBank.samples.find(s => s.key === key.toLowerCase());
    if (sample) {
      const audio = new Audio(currentBank.basePath + sample.file);
      audio.play();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      playSoundByKey(e.key);
    };

    // Add the event listener
    window.addEventListener('keypress', handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []); // Empty dependency array means this effect runs once on mount and once on unmount

  return (
    <div className="app">
      <img src={process.env.PUBLIC_URL + "/assets/visualiser-placeholder.png"} alt="Visualizer Placeholder" className="visualizer" />
      <div className="drum-machine">
        {currentBank.samples.map((sample, index) => (
          <DrumPad key={index} keyLabel={sample.key} samplePath={currentBank.basePath + sample.file} />
        ))}
      </div>
    </div>
  );
}

export default App;
