import React, { useEffect, useState, useCallback } from 'react';
import DrumPad from './components/DrumPad';
import './App.css';
import sampleBanks from './components/SampleBanks';
import WaveSurfer from 'wavesurfer.js';

function App() {
  const currentBank = sampleBanks.bank1;
  const [preloadedSamples, setPreloadedSamples] = useState({});
  const DEFAULT_TRACK = `${process.env.PUBLIC_URL}/assets/Julian Winter - Pete's Pool.mp3`;

  const [waveSurfer, setWaveSurfer] = useState(null);

  useEffect(() => {
    const waveSurferInstance = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple'
    });

    waveSurferInstance.load(DEFAULT_TRACK);

    setWaveSurfer(waveSurferInstance);
  
    return () => waveSurferInstance.destroy();
  }, [DEFAULT_TRACK]); // Include DEFAULT_TRACK in dependencies

  // Add play and pause functionality
  const handlePlayPause = () => {
    if (waveSurfer) {
      waveSurfer.playPause();
    }
  };


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
      <div id="waveform" className="visualizer"></div>
      <button onClick={handlePlayPause}>Play/Pause</button>
      <div className="drum-machine">
        {currentBank.samples.map((sample, index) => (
          <DrumPad key={index} keyLabel={sample.key} samplePath={currentBank.basePath + sample.file} />
        ))}
      </div>
    </div>
  );
}

export default App;
