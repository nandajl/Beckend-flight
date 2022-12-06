const userService = require("../../../services/userService")

module.exports = {
    async update(req,res){
        try {
            const dataUser = {
                firstName : req.body.firstName,
                lastName: req.body.lastName,
                address : req.body.address,
                photo : req.body.photo,
                phone : req.body.phone,
                imgVisa : req.body.imgVisa,
                imgPassport : req.body.imgPassport,
                imgResidentPermit : req.body.imgResidentPermit
            }
            const user = await userService.update(req.params.id, dataUser);
            res.status(201).json({
                status:"OK",
                data: dataUser
            });
        } catch (err) {
            res.status(400).json({
                status:"FAIL",
                message:err.message
            })
            
        }
    },

    async list(req, res){
        try {
            const role = "buyer"
            const {data, count} = await userService.list(role);
            res.status(200).json({
                status: "OK",
                data: { users: data },
                total: { total: count },
            });
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
              });
        }
    },

    async show(req,res){
        try {
            const car = await userService.get(req.params.id);
            res.status(200).json({
                status: "OK",
                data: car,
            });
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async destroy(req, res){
        try {
            await userService.delete(req.params.id);
            res.status(200).end();
        } catch (err) {
            res.status(422).json({
                status: "FAIL",
                message: err.message,
            });
        }
    }
}