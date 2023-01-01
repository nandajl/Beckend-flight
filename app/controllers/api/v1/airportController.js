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
        data: airport,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        messange: err.message,
      });
    }
  },

  async handleGetAllAirport(req, res) {
    try {
      const { data, count } = await airportService.getAll();

      res.status(201).json({
        status: 'OK',
        data: data,
        count: count,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
  async handleGetByPk(req, res) {
    try {
      const id = req.params.id;
      const airport = await airportService.getByPk(id);
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

  async handleDeleteAirport(req, res) {
    try {
      const id = req.params.id;
      await airportService.destroy(id);

      res.status(201).json({
        status: 'OK',
        message: 'Airport successfully deleted',
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
};
