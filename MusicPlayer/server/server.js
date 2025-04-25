const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static songs folder
app.use('/songs', express.static(path.join(__dirname, 'songs')));

// Dummy song list (these files must exist inside the /server/songs/ folder)
const songs = [
  {
    id: 1,
    title: 'Song 1',
    artist: 'Artist 1',
    url: '/songs/song1.mp3'
  },
  {
    id: 2,
    title: 'Song 2',
    artist: 'Artist 2',
    url: '/songs/song2.mp3'
  },
  {
    id: 3,
    title: 'Song 3',
    artist: 'Artist 3',
    url: '/songs/song3.mp3'
  }
];

// API endpoint to return song list
app.get('/api/songs', (req, res) => {
  res.json(songs);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
