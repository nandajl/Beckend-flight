'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.hasMany(models.Wishlist, {
        foreignKey: 'ticket_id'
      }),
      Ticket.hasMany(models.Transaction, {
        foreignKey: 'ticket_id'
      }),
      Ticket.belongsTo(models.Flight, {
        foreignKey: 'flight_id',
      })
    }
  }
  Ticket.init({
    flight_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    cabin_baggage: DataTypes.INTEGER,
    baggage: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};