const transactionRepository = require("../repositories/transactionRepository")

module.exports = {
    create(body){
        return transactionRepository.create(body)
    },

    update(id, body){
        return transactionRepository.update(id, body)
    },

    getTransaction(id){
        return transactionRepository.getTransaction(id)
    },
 
    findTransaction(id){
        return transactionRepository.findUserTransaction({user_id: id})
    },

    async getAllTransaction(){
        try {
            const transactions = await transactionRepository.getAllTransactions()
            const count = await transactionRepository.getTotalCount()
            return {
                data: transactions,
                count: count
            }
        } catch (err) {
            throw err
        }
    },

    delete(id){
        return transactionRepository.delete(id)
    }

}