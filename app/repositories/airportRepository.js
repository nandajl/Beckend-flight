const { Airport } = require('../models');

module.exports = {
  create(body) {
    return Airport.create(body);
  },

  update(id, body) {
    return Airport.update(body, { where: { id } });
  },

  getAll() {
    return Airport.findAll();
  },

  getTotalCount() {
    return Airport.count();
  },
};
