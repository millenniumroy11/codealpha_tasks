// src/pages/Playlist.js

import React, { useState } from 'react';

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);

  // Function to add a song to the playlist
  const addToPlaylist = (song) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
  };

  return (
    <div>
      <h2>My Playlist</h2>
      <ul>
        {playlist.map((song, index) => (
          <li key={index}>
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>

      {/* Just an example of adding a song manually */}
      <button onClick={() => addToPlaylist({ title: 'New Song', artist: 'Artist' })}>
        Add Song to Playlist
      </button>
    </div>
  );
};

export default Playlist;
