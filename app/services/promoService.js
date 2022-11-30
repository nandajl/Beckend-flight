const promoRepository = require('../repositories/promoRepository');

module.exports = {
  create(body) {
    return promoRepository.create(body);
  },
  getAll() {
    return promoRepository.getAll();
  },
  update(body, id) {
    return promoRepository.update(body, id);
  },
  getById(id) {
    return promoRepository.findById(id);
  },
  delete(id) {
    return promoRepository.delete(id);
  },
};
