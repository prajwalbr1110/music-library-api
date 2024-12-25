const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const Favorite = require('../models/Favorite');

const router = express.Router();

// Add a Favorite
router.post('/', authMiddleware, async (req, res) => {
    const { category, itemId } = req.body;
    try {
        const favorite = await Favorite.create({ category, itemId, userId: req.user.id });
        res.status(201).json({ message: 'Favorite added successfully', favorite });
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite', error: error.message });
    }
});

// Get All Favorites by Category
router.get('/:category', authMiddleware, async (req, res) => {
    const { category } = req.params;
    try {
        const favorites = await Favorite.findAll({
            where: { category, userId: req.user.id },
        });
        res.status(200).json({ message: 'Favorites retrieved successfully', favorites });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving favorites', error: error.message });
    }
});

// Delete a Favorite
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const favorite = await Favorite.findByPk(req.params.id);
        if (!favorite || favorite.userId !== req.user.id) {
            return res.status(404).json({ message: 'Favorite not found or unauthorized' });
        }

        await favorite.destroy();
        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing favorite', error: error.message });
    }
});

module.exports = router;
