const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Artist = require('./Artist');

const Album = sequelize.define('Album', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

// Associations
Artist.hasMany(Album, { foreignKey: 'artistId', onDelete: 'CASCADE' });
Album.belongsTo(Artist, { foreignKey: 'artistId' });

module.exports = Album;
