const ticketService = require("../../../services/ticketService")

module.exports = {
    async handleCreateTicket(req, res){
        try {
            const body = req.body
            const image = req.file
            const ticket = await ticketService.create(body, image)
            res.status(201).json({
                status: "OK",
                data: ticket
            })
        } catch (err) {
            res.status(401).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async handleUpdateTicket(req, res){
        try {
            const body = req.body
            const id = req.params.id
            const image = req.file
            const ticket = await ticketService.update(id, body, image)
            res.status(201).json({
                status: "OK",
                data: body
            })
        } catch (err) {
            res.status(401).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async handleListTicket(req, res){
        try {
            const { data, count} = await ticketService.getAllTicket()
            res.status(201).json({
                status: "OK",
                data: data,
                total: count
            })
        } catch (err) {
            res.status(401).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async handleGetTicket(req, res){
        try {
            const id = req.params.id
            const ticket = await ticketService.getTicket(id)
            res.status(201).json({
                status: "OK",
                data: ticket
            })      
        } catch (err) {
            res.status(401).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async handleDeleteTicket(req, res){
        try {
            const id = req.params.id
            const ticket = await ticketService.delete(id)
            res.status(201).json({
                status: "OK",
                message: "Ticket successfully deleted"
            })
        } catch (err) {
            res.status(401).json({
                status: "FAIL",
                message: err.message
            })
        }
    }
}