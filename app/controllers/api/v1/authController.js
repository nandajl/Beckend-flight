
const authService = require('../../../services/authService')

module.exports = {
    handleRegister(req,res){
        const {username, email, password} = req.body;
        const role = "2"
        authService.register(username, email, password, role).then((user)=>{
            if(!user){
                res.status(401).json({
                    staus: "FAIL",
                    message: `User with email ${email} already exist, please login`
                })
                return;
            }
            res.status(201).json({
                status: "OK",
                data: user
            })
        }).catch((err)=>{
            res.status(400).json({
                staus: "FAIL",
                message: err.message,
            });
        });
    },

    handleLogin(req,res){
        const {email, password} = req.body;
        authService.login(email, password).then((auth)=>{
            if(!auth){
                res.status(401).json({
                    staus: "FAIL",
                    message: "Email or password is not identified",
                })
                return;
            }
            res.status(200).json({
                status: "OK",
                data: auth
            })
        }).catch((err)=>{
            res.status(400).json({
                staus: "FAIL",
                message: err.message,
            });
        });
    },

    authorize(req, res, next){
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            res.status(403).json({
                message: "Unauthorized",
            })
            return;
        }

        const token = bearerToken.split('Bearer ')[1];
        authService.authorize(token).then((user) =>{
            if (!user) {
                res.status(403).json({
                    message: "Unauthorized"
                })
                return;
            }

            req.user = user;
            next();
        }).catch((err) => {
            res.status(403).json({
                message: "Unauthorized",
            })
            return;
        }) 
    },

    authorizeAdmin(req, res, next){
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            res.status(403).json({
                message: "Unauthorized",
            })
            return;
        }

        const token = bearerToken.split('Bearer ')[1];
        authService.authorizeAdmin(token).then((user) =>{
            if (!user) {
                res.status(403).json({
                    message: "Your not an admin"
                })
                return;
            }

            req.user = user;
            next();
        }).catch((err) => {
            res.status(403).json({
                message: "Unauthorized",
            })
            return;
        }) 
    },

    whoAmI(req, res){
        const user = req.user;
        res.status(201).json({
            status: "OK",
            data: user
        }).catch()
        
        
    }
}