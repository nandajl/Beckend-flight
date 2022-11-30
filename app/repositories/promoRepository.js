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
  update(body, id) {
    return Promo.update(body, { where: { id } });
  },
  findById(id) {
    return Promo.findByPk(id);
  },
};
