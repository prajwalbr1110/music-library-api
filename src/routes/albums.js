const express = require('express');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware');
const Album = require('../models/Album');

const router = express.Router();

// Create an Album
router.post('/', authMiddleware, checkRole(['Admin', 'Editor']), async (req, res) => {
    const { name, year, hidden, artistId } = req.body;
    try {
        const album = await Album.create({ name, year, hidden, artistId });
        res.status(201).json({ message: 'Album created successfully', album });
    } catch (error) {
        res.status(500).json({ message: 'Error creating album', error: error.message });
    }
});

// Get All Albums
router.get('/', authMiddleware, async (req, res) => {
    try {
        const albums = await Album.findAll();
        res.status(200).json({ message: 'Albums retrieved successfully', albums });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving albums', error: error.message });
    }
});

// Get a Single Album by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.status(200).json({ message: 'Album retrieved successfully', album });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving album', error: error.message });
    }
});

// Update an Album
router.put('/:id', authMiddleware, checkRole(['Admin', 'Editor']), async (req, res) => {
    const { name, year, hidden } = req.body;
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        album.name = name ?? album.name;
        album.year = year ?? album.year;
        album.hidden = hidden ?? album.hidden;
        await album.save();

        res.status(200).json({ message: 'Album updated successfully', album });
    } catch (error) {
        res.status(500).json({ message: 'Error updating album', error: error.message });
    }
});

// Delete an Album
router.delete('/:id', authMiddleware, checkRole(['Admin']), async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        await album.destroy();
        res.status(200).json({ message: 'Album deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting album', error: error.message });
    }
});

module.exports = router;
