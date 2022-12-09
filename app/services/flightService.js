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

  update(id, body) {
    return flightRepository.update(id, body);
  },

  delete(id) {
    return flightRepository.delete(id);
  },

  getById(id) {
    return flightRepository.getById(id);
  },
};
