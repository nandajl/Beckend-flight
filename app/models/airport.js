'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Airport.hasMany(models.Flight, {
        as: 'from',
        foreignKey: 'from_airport_id',
      }),
        Airport.hasMany(models.Flight, {
          as: 'to',
          foreignKey: 'to_airport_id',
        });
    }
  }
  Airport.init(
    {
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Airport',
    }
  );
  return Airport;
};
