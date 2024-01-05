import React from 'react';

function DrumPad({ sound, label }) {
  return (
    <button className="drum-pad">
      {label}
    </button>
  );
}

export default DrumPad;
