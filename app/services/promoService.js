const promoRepository = require('../repositories/promoRepository');

module.exports = {
  create(body) {
    return promoRepository.create(body);
  },
  getAll() {
    return promoRepository.getAll();
  },
};
