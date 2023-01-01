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
      return err;
    }
  },

  create(body) {
    return flightRepository.create(body);
  },

  update(id, body) {
    return flightRepository.update(id, body);
  },

  destroy(id) {
    return flightRepository.destroy(id);
  },

  getByPk(id) {
    return flightRepository.getByPk(id);
  }
};
