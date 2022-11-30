const { Promo } = require('../models');

module.exports = {
  create(body) {
    return Promo.create(body);
  },
  getAll() {
    return Promo.findAll();
  },
  getTotalCount() {
    return Promo.count();
  },
};
