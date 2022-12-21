const notificationService = require("../../../services/notificationService")

module.exports = {
    async handleUpdateNotification(req, res){
        try {
            const id = req.params.id
            const update = {
                "isRead": true
            }
            const notification = await notificationService.update(id, update)
            res.status(201).json({
                status: "OK",
                data: notification
            })
        } catch (err) {
            res.status(401).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async handleFindNotification(req, res){
        try {
            const id = req.params.id
            const { data, count } = await notificationService.findNotification(id)
            res.status(201).json({
                status: "OK",
                data: data,
                count: count
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        }
    },
}