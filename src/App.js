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

  const handlePlayPause = useCallback(() => {
    if (waveSurfer) {
      waveSurfer.playPause();
    }
  }, [waveSurfer]);

  const handleRestartTrack = useCallback(() => {
    if (waveSurfer) {
      const isPlaying = waveSurfer.isPlaying();
      waveSurfer.seekTo(0); // Restart the track
      
      if (isPlaying) {
        waveSurfer.play(); // Continue playing if it was playing
      } else {
        waveSurfer.pause(); // Stay paused if it was not playing
      }
    }
  }, [waveSurfer]);
  

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        e.preventDefault(); // Prevent the default action of the space bar
        handlePlayPause();
      } else if (e.key === 'ArrowLeft') {
        handleRestartTrack();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlePlayPause, handleRestartTrack]);

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
      {/* <div className="now-playing">
        <div className="scrolling-text">Now Playing: Julian Winter - Pete's Pool</div>
      </div> */}
      <div className="drum-machine">
        {currentBank.samples.map((sample, index) => (
          <DrumPad key={index} keyLabel={sample.key} samplePath={currentBank.basePath + sample.file} />
        ))}
        <button className="control-pad play-pause" onClick={handlePlayPause}>▶</button>
        <button className="control-pad restart" onClick={handleRestartTrack}>←</button>
      </div>
    </div>
  );
}

export default App;
