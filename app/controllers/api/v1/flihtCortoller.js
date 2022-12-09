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

  async handleCreateFligh(req, res) {
    try {
      const body = req.body;
      console.log(body);
      const flight = await flightService.create(body);

      res.status(201).json({
        status: 'OK',
        data: flight,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        messange: err.messange,
      });
    }
  },

  async handleUpdateFlight(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const flight = await flightService.update(id, body);

      res.status(201).json({
        status: 'OK',
        data: flight,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        messange: err.messange,
      });
    }
  },

  async handleGetByPk(req, res) {
    try {
      const id = req.params.id;

      const flight = await flightService.getByPk(id);

      res.status(201).json({
        status: 'OK',
        data: flight,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        messange: err.messange,
      });
    }
  },

  async handleDeleteFlight(req, res) {
    try {
      const id = req.params.id;
      const flight = await flightService.delete(id);

      res.status(201).json({
        status: 'OK',
        messange: 'Flight successfully deleted',
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        messange: err.messange,
      });
    }
  },
};
