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

  getByPk(id) {
    return Flight.findByPk(id);
  },

  delete(id) {
    return Flight.destroy({ where: { id } });
  },
};
