'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flight.init(
    {
      from_airport_id: DataTypes.INTEGER,
      to_airport_id: DataTypes.INTEGER,
      arrival_time: DataTypes.DATE,
      depature: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Flight',
    }
  );
  return Flight;
};
