const authController = require('./authController');
const promoController = require('./promoController');

const userController = require('./userController');
const planeController = require('./planeController');
const ticketController = require('./ticketController');
const airportConroller = require('./airportController');
const flightContoller = require('./flihtCortoller');
const wishlistController = require("./wishlistController");


module.exports = {
  authController,
  promoController,
  userController,
  planeController,
  ticketController,
  wishlistController,
  airportConroller,
  flightContoller,
};
