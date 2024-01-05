import React, { useEffect, useState, useCallback } from 'react';
import DrumPad from './components/DrumPad';
import './App.css';
import sampleBanks from './components/SampleBanks';

function App() {
  const currentBank = sampleBanks.bank1;
  const [preloadedSamples, setPreloadedSamples] = useState({});

  useEffect(() => {
    const samples = {};
    currentBank.samples.forEach(sample => {
      const audio = new Audio(currentBank.basePath + sample.file);
      audio.preload = 'auto';
      samples[sample.key] = audio;
    });
    setPreloadedSamples(samples);
  }, [currentBank.basePath, currentBank.samples]); // Include necessary dependencies

  const playSoundByKey = useCallback((key) => {
    const sampleKey = key.toLowerCase();
    if (preloadedSamples[sampleKey]) {
      preloadedSamples[sampleKey].currentTime = 0;
      preloadedSamples[sampleKey].play();
    }
  }, [preloadedSamples]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      playSoundByKey(e.key);
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [playSoundByKey]); // Add playSoundByKey as a dependency

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
