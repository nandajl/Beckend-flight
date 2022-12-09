const flightService = require('../../../services/flightService');

module.exports = {
  async handleGettAllFliht(req, res) {
    try {
      const fliht = await flightService.getAll();

      res.status(201).json({
        status: 'OK',
        data: fliht,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        messange: err.messange,
      });
    }
  },
};
