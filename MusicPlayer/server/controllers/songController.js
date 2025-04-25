// server/controllers/songController.js

const getRandomSongs = (req, res) => {
    const songs = [
      { id: 1, title: "Song 1", artist: "Artist 1", url: "/songs/song1.mp3" },
      { id: 2, title: "Song 2", artist: "Artist 2", url: "/songs/song2.mp3" },
      { id: 3, title: "Song 3", artist: "Artist 3", url: "/songs/song3.mp3" },
    ];
    res.json(songs);
  };
  
  module.exports = { getRandomSongs };
  