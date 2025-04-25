// client/src/components/Player.js
import React, { useRef, useState } from 'react';

const Player = ({ currentSong }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipSong = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  if (!currentSong) return <div>Select a song to play!</div>;

  return (
    <div>
      <h2>Now Playing: {currentSong.title}</h2>
      <p>{currentSong.artist}</p>
      <audio ref={audioRef} src={`http://localhost:5000${currentSong.url}`} />
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={skipSong}>Skip</button>
    </div>
  );
};

export default Player;
