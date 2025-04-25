// server/routes/songs.js

const express = require('express');
const router = express.Router();
const { getSongs } = require('../controllers/songController');

// Route for fetching songs
router.get('/random', getSongs);

module.exports = router;
