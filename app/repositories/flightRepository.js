const { Flight } = require('../models');

module.exports = {
  getAll() {
    return Flight.findAll();
  },

  getTotalCount() {
    return Flight.count();
  },
};
