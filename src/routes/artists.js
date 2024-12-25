const express = require('express');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware');
const Artist = require('../models/Artist');

const router = express.Router();

// Create an Artist
router.post('/', authMiddleware, checkRole(['Admin', 'Editor']), async (req, res) => {
    const { name, grammy, hidden } = req.body;
    try {
        const artist = await Artist.create({ name, grammy, hidden });
        res.status(201).json({ message: 'Artist created successfully', artist });
    } catch (error) {
        res.status(500).json({ message: 'Error creating artist', error: error.message });
    }
});

// Get All Artists
router.get('/', authMiddleware, async (req, res) => {
    try {
        const artists = await Artist.findAll();
        res.status(200).json({ message: 'Artists retrieved successfully', artists });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving artists', error: error.message });
    }
});

// Get a Single Artist by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.status(200).json({ message: 'Artist retrieved successfully', artist });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving artist', error: error.message });
    }
});

// Update an Artist
router.put('/:id', authMiddleware, checkRole(['Admin', 'Editor']), async (req, res) => {
    const { name, grammy, hidden } = req.body;
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        artist.name = name ?? artist.name;
        artist.grammy = grammy ?? artist.grammy;
        artist.hidden = hidden ?? artist.hidden;
        await artist.save();

        res.status(200).json({ message: 'Artist updated successfully', artist });
    } catch (error) {
        res.status(500).json({ message: 'Error updating artist', error: error.message });
    }
});

// Delete an Artist
router.delete('/:id', authMiddleware, checkRole(['Admin']), async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        await artist.destroy();
        res.status(200).json({ message: 'Artist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting artist', error: error.message });
    }
});

module.exports = router;
