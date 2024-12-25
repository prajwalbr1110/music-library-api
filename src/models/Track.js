const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Album = require('./Album');

const Track = sequelize.define('Track', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER, // in seconds
        allowNull: false,
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

// Associations
Album.hasMany(Track, { foreignKey: 'albumId', onDelete: 'CASCADE' });
Track.belongsTo(Album, { foreignKey: 'albumId' });

module.exports = Track;
