import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/songs")
      .then(res => {
        setSongs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch songs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Songs...</p>;

  return (
    <div>
      <h2>Songs</h2>
      {songs.map(song => (
        <div key={song.id}>
          <p>{song.title}</p>
          <audio controls>
            <source src={`http://localhost:5000${song.url}`} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      ))}
    </div>
  );
};

export default Home;
