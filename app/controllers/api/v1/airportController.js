const airportService = require('../../../services/airportService');

module.exports = {
  async handleCreateAirport(req, res) {
    try {
      const body = req.body;
      const airport = await airportService.create(body);

      res.status(201).json({
        status: 'OK',
        data: airport,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async handleUpdateAirport(req, res) {
    try {
      const body = req.body;
      const id = req.params.id;

      const airport = await airportService.update(id, body);

      res.status(201).json({
        status: 'OK',
        data: body,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        messange: err.message,
      });
    }
  },
};
