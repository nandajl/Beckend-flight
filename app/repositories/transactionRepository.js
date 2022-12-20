const { Transaction } = require("../models")

module.exports = {
    create(body){
        return Transaction.create(body)
    },

    update(id, body){
        return Transaction.update(body, {
            where: {
                id
            }
        })
    },

    getAllTransactions(){
        return Transaction.findAll({
            include: [ { all: true } ]
        })
    },

    getTransaction(id){
        return Transaction.findByPk(id)
    },

    findUserTransaction(condition){
        return Transaction.findAll({where: condition})
    },

    delete(id){
        return Transaction.destroy({
            where : {
                id
            }
        })
    },

    getTotalCount(){
        return Transaction.count()
    }

}