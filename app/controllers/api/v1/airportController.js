const airportService = require('../../../services/airportService');

module.exports = {
  async handleCreateAirport(req, res) {
    try {
      const body = req.body;
      const airport = await airportService.create(body);

      res.status(200).json({
        status: 'OK',
        data: airport,
      });
    } catch (err) {
      res.status(401).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
};
