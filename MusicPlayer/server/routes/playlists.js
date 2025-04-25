const express = require('express');
const router = express.Router();

let playlists = [];

router.get('/', (req, res) => res.json(playlists));

router.post('/', (req, res) => {
  const newPlaylist = {
    id: Date.now(),
    name: req.body.name,
    songs: [],
  };
  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
});

router.put('/:id', (req, res) => {
  const playlist = playlists.find(p => p.id == req.params.id);
  if (playlist) {
    playlist.songs = req.body.songs;
    res.json(playlist);
  } else {
    res.status(404).json({ message: 'Playlist not found' });
  }
});

module.exports = router;
