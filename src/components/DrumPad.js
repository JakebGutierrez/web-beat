import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function DrumPad({ keyLabel, samplePath }) {
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    const loadedAudio = new Audio(samplePath)
    loadedAudio.preload = 'auto' // Indicates that the audio should be preloaded
    setAudio(loadedAudio)
  }, [samplePath])

  const playSound = () => {
    if (audio) {
      audio.currentTime = 0
      audio.play()
    }
  }

  DrumPad.propTypes = {
    keyLabel: PropTypes.string.isRequired,
    samplePath: PropTypes.string.isRequired,
  }

  return (
    <button className="drum-pad" onClick={playSound}>
      {keyLabel}
    </button>
  )
}

export default DrumPad
