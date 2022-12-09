const airportRepository = require('../repositories/airportRepository');

module.exports = {
  create(body) {
    return airportRepository.create(body);
  },
};
