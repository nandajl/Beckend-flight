const transactionService = require("../../../services/transactionService")

module.exports = {
    async handleCreateTransaction(req, res){
        try {
            const body = req.body
            console.log(body)
            const transaction = await transactionService.create(body)
            res.status(201).json({
                status: "OK",
                data: transaction
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async handleUpdateTransaction(req, res){
        try {
            const body = req.body
            const id = req.params.id
            const transaction = await transactionService.update(id, body)
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

    async handleListTransaction(req, res){
        try {
            const { data, count } = await transactionService.getAllTransaction()
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

    async handleGetTransaction(req, res){
        try {
            const id = req.params.id
            const transaction = await transactionService.getTransaction(id)
            res.status(201).json({
                status: "OK",
                data: transaction
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        }
    },

    async handleDeleteTransaction(req, res){
        try {
            const id = req.params.id
            const transaction = await transactionService.delete(id)
            res.status(200).json({
                status: "OK",
                message: "Transaction successfully deleted"
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message
            })
        }
    }
}