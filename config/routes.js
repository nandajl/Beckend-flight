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
apiRouter.post('/api/v1/promo', controllers.api.v1.promoController.handleCreatePromo);
apiRouter.get('/api/v1/promo', controllers.api.v1.promoController.handleGetAllPromo);
apiRouter.put('/api/v1/promo/:id', controllers.api.v1.promoController.handleUpdatePromo);
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

// airport
apiRouter.post('/api/vi/airport', controllers.api.v1.airportConroller.handleCreateAirport);
apiRouter.put('/api/vi/airport/:id', controllers.api.v1.airportConroller.handleUpdateAirport);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
