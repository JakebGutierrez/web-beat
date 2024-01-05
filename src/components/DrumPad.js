import React from 'react';

function DrumPad({ keyLabel, samplePath }) {
  const playSound = () => {
    const audio = new Audio(samplePath);
    audio.play();
  };

  return (
    <button className="drum-pad" onClick={playSound}>
      {keyLabel}
    </button>
  );
}

export default DrumPad;
