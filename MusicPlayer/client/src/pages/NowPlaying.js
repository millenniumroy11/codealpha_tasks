// client/src/pages/NowPlaying.js
import React, { useState, useRef } from 'react';

const NowPlaying = ({ currentSong, setCurrentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleProgress = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Now Playing</h1>
      {currentSong ? (
        <div>
          <h2 className="text-xl">{currentSong.title}</h2>
          <h3 className="text-lg">{currentSong.artist}</h3>
          <audio
            ref={audioRef}
            src={currentSong.url}
            onTimeUpdate={updateTime}
            onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            onEnded={handleEnded}
            controls={false}
            className="my-4"
          />
          <div>
            <button
              onClick={togglePlay}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgress}
              className="w-full"
            />
            <div>
              <span>{Math.floor(currentTime)}s / {Math.floor(duration)}s</span>
            </div>
          </div>
        </div>
      ) : (
        <p>No song is playing</p>
      )}
    </div>
  );
};

export default NowPlaying;
