const flightRepository = require('../repositories/flightRepository');

module.exports = {
  async getAll() {
    try {
      const fliht = await flightRepository.getAll();
      const count = await flightRepository.getTotalCount();

      return {
        data: fliht,
        count: count,
      };
    } catch (err) {
      throw err;
    }
  },

  create(body) {
    return flightRepository.create(body);
  },
};
