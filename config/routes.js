const express = require('express');
const controllers = require('../app/controllers');
const swaggerUI = require('swagger-ui-express');
const swgDoc = require('../doc/OBYKAO26_1-template-1.0.0-resolved.json');
const cloudStorage = require('./cloudStorage');

const apiRouter = express.Router();

apiRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swgDoc));

apiRouter.get('/', controllers.api.main.handleGetRoot);
/**
 * Authentication Resource
 * */
apiRouter.post('/api/v1/login', controllers.api.v1.authController.handleLogin);
apiRouter.post('/api/v1/login/admin', controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.authController.handleLogin);
apiRouter.post('/api/v1/register', controllers.api.v1.authController.handleRegister);

//current user
apiRouter.get('/api/v1/user', controllers.api.v1.authController.authorize, controllers.api.v1.authController.whoAmI);

// promo
apiRouter.post('/api/v1/promo', cloudStorage.single('photo'), controllers.api.v1.promoController.handleCreatePromo);
apiRouter.get('/api/v1/promo', controllers.api.v1.promoController.handleGetAllPromo);
apiRouter.put('/api/v1/promo/:id', cloudStorage.single('photo'), controllers.api.v1.promoController.handleUpdatePromo);
apiRouter.get('/api/v1/promo/:id', controllers.api.v1.promoController.handleGetByIdPromo);
apiRouter.delete('/api/v1/promo/:id', controllers.api.v1.promoController.handleDeletePromo);

//user Routes
apiRouter.get('/api/v1/users', controllers.api.v1.userController.list);
apiRouter.put('/api/v1/users/:id', cloudStorage.single('photo'), controllers.api.v1.userController.update);
apiRouter.get('/api/v1/users/:id', controllers.api.v1.userController.show);
apiRouter.delete('/api/v1/users/:id', controllers.api.v1.userController.destroy);

//plane Routes
apiRouter.get('/api/v1/planes', controllers.api.v1.planeController.handleListPlane);
apiRouter.post('/api/v1/planes', controllers.api.v1.planeController.handleCreatePlane);
apiRouter.put('/api/v1/planes/:id', controllers.api.v1.planeController.handleUpdatePlane);
apiRouter.get('/api/v1/planes/:id', controllers.api.v1.planeController.handleGetPlane);
apiRouter.delete('/api/v1/planes/:id', controllers.api.v1.planeController.handleDeletePlane);

//ticket routes
apiRouter.get('/api/v1/ticket', controllers.api.v1.ticketController.handleListTicket);
apiRouter.post('/api/v1/ticket', controllers.api.v1.ticketController.handleCreateTicket);
apiRouter.put('/api/v1/ticket/:id', controllers.api.v1.ticketController.handleUpdateTicket);
apiRouter.get('/api/v1/ticket/:id', controllers.api.v1.ticketController.handleGetTicket);
apiRouter.delete('/api/v1/ticket/:id', controllers.api.v1.ticketController.handleDeleteTicket);

//wishlist routes
apiRouter.get('/api/v1/wishlist', controllers.api.v1.wishlistController.handleListWishlist);
apiRouter.post('/api/v1/wishlist', controllers.api.v1.wishlistController.handleCreateWishlist);
apiRouter.put('/api/v1/wishlist/:id', controllers.api.v1.wishlistController.handleUpdateWishlist);
apiRouter.get('/api/v1/wishlist/:id', controllers.api.v1.wishlistController.handleGetWishlist);
apiRouter.get('/api/v1/wishlist/user/:id', controllers.api.v1.wishlistController.handleFindWishlist);
apiRouter.delete('/api/v1/wishlist/:id', controllers.api.v1.wishlistController.handleDeleteWishlist);

// airport
apiRouter.post('/api/v1/airport', controllers.api.v1.airportConroller.handleCreateAirport);
apiRouter.put('/api/v1/airport/:id', controllers.api.v1.airportConroller.handleUpdateAirport);
apiRouter.get('/api/v1/airport', controllers.api.v1.airportConroller.handleGetAllAirport);
apiRouter.get('/api/v1/airport/:id', controllers.api.v1.airportConroller.handleGetByPk);
apiRouter.delete('/api/v1/airport/:id', controllers.api.v1.airportConroller.handleDeleteAirport);

// flight
apiRouter.get('/api/v1/flight', controllers.api.v1.flightContoller.handleGettAllFliht);
apiRouter.post('/api/v1/flight', controllers.api.v1.flightContoller.handleCreateFligh);
apiRouter.put('/api/v1/flight/:id', controllers.api.v1.flightContoller.handleUpdateFlight);
apiRouter.get('/api/v1/flight/:id', controllers.api.v1.flightContoller.handleGetByPk);
apiRouter.delete('/api/v1/flight/:id', controllers.api.v1.flightContoller.handleDeleteFlight);


// transaction
apiRouter.get('/api/v1/transaction', controllers.api.v1.transactionController.handleListTransaction);
apiRouter.post('/api/v1/transaction', controllers.api.v1.transactionController.handleCreateTransaction);
apiRouter.put('/api/v1/transaction/:id', controllers.api.v1.transactionController.handleUpdateTransaction);
apiRouter.get('/api/v1/transaction/:id', controllers.api.v1.transactionController.handleGetTransaction);
apiRouter.delete('/api/v1/transaction/:id', controllers.api.v1.transactionController.handleDeleteTransaction);
apiRouter.get('/api/v1/transaction/history/:id', controllers.api.v1.transactionController.handleFindTransaction);

//notification
apiRouter.put('/api/v1/notification/:id', controllers.api.v1.notificationController.handleUpdateNotification);
apiRouter.get('/api/v1/notification/user/:id', controllers.api.v1.notificationController.handleFindNotification);

//search flight
apiRouter.post('/api/v1/flight/search', controllers.api.v1.flightContoller.handleSearchFlight);



apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
