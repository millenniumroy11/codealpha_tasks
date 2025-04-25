// client/src/pages/Search.js
import React, { useState, useEffect } from 'react';
import SongCard from '../components/SongCard'; // Assuming you want to render SongCard

const Search = () => {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/songs/random'); // Make sure endpoint is correct
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-page">
      <h1>Search Songs</h1>
      <input 
        type="text" 
        placeholder="Search by title or artist"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)} 
      />
      <div className="song-list">
        {filteredSongs.map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Search;
