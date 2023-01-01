const airportRepository = require('../repositories/airportRepository');

module.exports = {
  create(body) {
    return airportRepository.create(body);
  },

  update(id, body) {
    return airportRepository.update(id, body);
  },

  async getAll() {
    try {
      const airport = await airportRepository.getAll();
      const count = await airportRepository.getTotalCount();

      return {
        data: airport,
        count: count,
      };
    } catch (err) {
      return err;
    }
  },

  getByPk(id) {
    return airportRepository.getByPk(id);
  },

  destroy(id) {
    return airportRepository.destroy(id);
  },
};
