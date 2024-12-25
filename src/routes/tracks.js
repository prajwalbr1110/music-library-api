const express = require('express');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware');
const Track = require('../models/Track');

const router = express.Router();

// Create a Track
router.post('/', authMiddleware, checkRole(['Admin', 'Editor']), async (req, res) => {
    const { name, duration, hidden, albumId } = req.body;
    try {
        const track = await Track.create({ name, duration, hidden, albumId });
        res.status(201).json({ message: 'Track created successfully', track });
    } catch (error) {
        res.status(500).json({ message: 'Error creating track', error: error.message });
    }
});

// Get All Tracks
router.get('/', authMiddleware, async (req, res) => {
    try {
        const tracks = await Track.findAll();
        res.status(200).json({ message: 'Tracks retrieved successfully', tracks });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tracks', error: error.message });
    }
});

// Get a Single Track by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const track = await Track.findByPk(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        res.status(200).json({ message: 'Track retrieved successfully', track });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving track', error: error.message });
    }
});

// Update a Track
router.put('/:id', authMiddleware, checkRole(['Admin', 'Editor']), async (req, res) => {
    const { name, duration, hidden } = req.body;
    try {
        const track = await Track.findByPk(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }

        track.name = name ?? track.name;
        track.duration = duration ?? track.duration;
        track.hidden = hidden ?? track.hidden;
        await track.save();

        res.status(200).json({ message: 'Track updated successfully', track });
    } catch (error) {
        res.status(500).json({ message: 'Error updating track', error: error.message });
    }
});

// Delete a Track
router.delete('/:id', authMiddleware, checkRole(['Admin']), async (req, res) => {
    try {
        const track = await Track.findByPk(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }

        await track.destroy();
        res.status(200).json({ message: 'Track deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting track', error: error.message });
    }
});

module.exports = router;
