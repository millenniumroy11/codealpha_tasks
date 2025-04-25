const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const SONGS_DIR = path.join(__dirname, '../public/songs');

router.get('/', (req, res) => {
  // Read song files from the directory
  fs.readdir(SONGS_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read song directory' });

    const query = (req.query.q || '').toLowerCase();
    const results = files
      .filter(file => file.endsWith('.mp3'))
      .map((file) => ({
        title: path.parse(file).name,  // Extract the name without the ".mp3" extension
        artist: 'Unknown',             // Optionally, you can parse metadata or improve this later
        url: `/songs/${file}`,
      }))
      .filter(song =>
        song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
      );

    res.json(results);
  });
});

module.exports = router;
