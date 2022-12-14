'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Ticket, {
        foreignKey: 'ticket_id'
      }),
      Transaction.belongsTo(models.User, {
        foreignKey: 'user_id'
      }),
      Transaction.belongsTo(models.Promo, {
        foreignKey: 'promo_id'
      }),
      Transaction.hasMany(models.Notification, {
        foreignKey: 'transaction_id'
      })
    }
  }
  Transaction.init({
    ticket_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    promo_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};