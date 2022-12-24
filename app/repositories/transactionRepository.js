const { Transaction, Ticket, User, Promo, Airport, Plane } = require("../models")

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
        return Transaction.findAll({
            where: condition,
            include: [ 
                { model: Ticket,
                  include: [{ model: Flight,
                    include: [
                      { model: Plane },
                      { model: Airport, as: 'from' },
                      { model: Airport, as: 'to' }
                    ]  
                  }]
                },
                { model: User },
                { model: Promo },
            ]
        })
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