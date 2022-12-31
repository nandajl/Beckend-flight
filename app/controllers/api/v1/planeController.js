const planeService = require("../../../services/planeService")

module.exports = {
    async handleCreatePlane(req, res){
        try {
            const body = req.body
            console.log(body)
            const plane = await planeService.create(body)
            res.status(201).json({
                status: "OK",
                data: plane
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async handleUpdatePlane(req, res){
        try {
            const body = req.body
            const id = req.params.id
            const plane = await planeService.update(id, body)
            res.status(201).json({
                status: "OK",
                data: body
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async handleListPlane(req, res){
        try {
            const { data, count } = await planeService.getAllPlane()
            res.status(201).json({
                status: "OK",
                data: data,
                total: count
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async handleGetPlane(req, res){
        try {
            const id = req.params.id
            const plane = await planeService.getPlane(id)
            res.status(201).json({
                status: "OK",
                data: plane
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async handleDeletePlane(req, res){
        try {
            const id = req.params.id
            const plane = await planeService.delete(id)
            res.status(200).json({
                status: "OK",
                message: "Plane successfully deleted"
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        }
    }
}