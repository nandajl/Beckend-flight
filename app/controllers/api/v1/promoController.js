const promoService = require('../../../services/promoService');

module.exports = {
  async handleCreatePromo(req, res) {
    try {
      const body = req.body;
      const promo = await promoService.create(body);
      res.status(201).json({
        status: 'Ok',
        data: promo,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async handleGetAllPromo(req, res) {
    try {
      const promo = await promoService.getAll();
      console.log(promo);
      res.status(201).json({
        status: 'Ok',
        data: promo,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async handleUpdatePromo(req, res) {
    try {
      const body = req.body;
      const param = req.params.id;
      console.log(param);
      const promo = await promoService.update(body, param);
      res.status(201).json({
        status: 'OK',
        message: promo,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },

  async handleGetByIdPromo(req, res) {
    try {
      const param = req.params.id;
      const promo = await promoService.getById(param);
      res.status(201).json({
        status: 'OK',
        data: promo,
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        data: err.message,
      });
    }
  },
};
