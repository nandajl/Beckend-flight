const { Airport } = require('../models');

module.exports = {
  create(body) {
    return Airport.create(body);
  },
};
