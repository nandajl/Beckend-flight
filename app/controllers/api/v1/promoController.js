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
};
