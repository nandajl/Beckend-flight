const { Flight } = require('../models');

module.exports = {
  getAll() {
    return Flight.findAll({
      include: [{ all: true }],
    });
  },

  getTotalCount() {
    return Flight.count();
  },

  create(body) {
    return Flight.create(body);
  },

  update(id, body) {
    return Flight.update(body, { where: { id } });
  },

  getByPk(id) {
    return Flight.findByPk(id);
  },

  delete(id) {
    return Flight.destroy({ where: { id } });
  },

  findFlight(condition){
    return Flight.findAll({where: condition})
},
};
