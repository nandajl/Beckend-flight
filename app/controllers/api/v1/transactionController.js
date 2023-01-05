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
                    const dataTransaction = await transactionService.getTransaction(transaction.dataValues.id);
                    const desc = dataTransaction.Ticket.desc
                    const notificationBuyerBody = {
                        transaction_id : transaction.dataValues.id,
                        user_id: transaction.dataValues.user_id, 
                        message: `Booking ${desc} Success`,
                        isRead: false
                    }
                    const notificationAdminBody = {
                        transaction_id : transaction.dataValues.id,
                        user_id : 1,
                        message: `There are new transaction, ${desc}`,
                        isRead: false
                    }
                    const notificationAdminBody2 = {
                        transaction_id : transaction.dataValues.id,
                        user_id : 14,
                        message: `There are new transaction, ${desc}`,
                        isRead: false
                    }
                    await notificationService.create(notificationBuyerBody)   
                    await notificationService.create(notificationAdminBody)   
                    await notificationService.create(notificationAdminBody2)   
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
            const transaction = await transactionService.destroy(id)
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