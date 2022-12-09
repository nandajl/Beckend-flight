const { Flight } = require('../models');

module.exports = {
  getAll() {
    return Flight.findAll();
  },

  getTotalCount() {
    return Flight.count();
  },

  create(body) {
    return Flight.create(body);
  },

  update(id, body) {
    return Flight.update(body, { where: { id } });
  },

  getById(id) {
    return Flight.findByPk(id);
  },

  delete(id) {
    return Flight.desdroy({ where: { id } });
  },
};
