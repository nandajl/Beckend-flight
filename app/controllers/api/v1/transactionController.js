const transactionService = require("../../../services/transactionService")
const notificationService = require("../../../services/notificationService")


module.exports = {
    async handleCreateTransaction(req, res){
        try {
            const body = req.body
            console.log(body)
            const transaction = await transactionService.create(body)
            if (transaction) {
                try {
                    const notificationBuyerBody = {
                        transaction_id : transaction.dataValues.id,
                        message: "Booking Success",
                        role: "buyer",
                        isRead: false
                    }
                    const notificationAdminBody = {
                        transaction_id : transaction.dataValues.id,
                        message: "There are new transaction",
                        role: "admin",
                        isRead: false
                    }
                    const notification1 = await notificationService.create(notificationBuyerBody)   
                    const notification2 = await notificationService.create(notificationAdminBody)   
                } catch (err) {
                    res.status(400).json({
                        status: "FAIL",
                        message: err.message
                    })
                }
            }
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

    async handleFindTransaction(req, res){
        try {
            const id = req.params.id
            const transactions = await transactionService.findTransaction(id)
            res.status(201).json({
                status: "OK",
                data: transactions
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