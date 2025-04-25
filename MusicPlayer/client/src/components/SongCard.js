// client/src/components/SongCard.js
import React from 'react';

const SongCard = ({ song, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
    </div>
  );
};

export default SongCard;
