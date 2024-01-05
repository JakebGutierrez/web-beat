import React, { useEffect, useState } from 'react';

function DrumPad({ keyLabel, samplePath }) {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const loadedAudio = new Audio(samplePath);
    loadedAudio.preload = 'auto'; // Indicates that the audio should be preloaded
    setAudio(loadedAudio);
  }, [samplePath]);

  const playSound = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <button className="drum-pad" onClick={playSound}>
      {keyLabel}
    </button>
  );
}

export default DrumPad;
