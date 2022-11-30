const express = require("express");
const controllers = require("../app/controllers");
// const swaggerUI = require("swagger-ui-express");
// const swgDoc = require('../openapi.json');

const apiRouter = express.Router();

// apiRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swgDoc))

apiRouter.get('/', controllers.api.main.handleGetRoot)
/**
 * Authentication Resource
 * */
apiRouter.post("/api/v1/login", controllers.api.v1.authController.handleLogin);
apiRouter.post("/api/v1/login/admin", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.authController.handleLogin);
apiRouter.post("/api/v1/register", controllers.api.v1.authController.handleRegister);

//current user
apiRouter.post("/api/v1/user", controllers.api.v1.authController.authorize, controllers.api.v1.authController.whoAmI);

//user Routes
apiRouter.get("/api/v1/users", controllers.api.v1.authController.authorize, controllers.api.v1.userController.list);
apiRouter.post("/api/v1/users", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.userController.create);
apiRouter.put("/api/v1/users/:id", controllers.api.v1.authController.authorize, controllers.api.v1.userController.update);
apiRouter.get("/api/v1/users/:id", controllers.api.v1.authController.authorize, controllers.api.v1.userController.show);
apiRouter.delete("/api/v1/users/:id", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.userController.destroy);


apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
