const { Ticket } = require("../models")

module.exports = {
    create(body){
        return Ticket.create(body)
    },

    update(id, body){
        return Ticket.update(body, {
            where: {
                id
            }
        })
    },

    delete(id){
        return Ticket.destroy({
            where: {
                id
            }
        })
    },

    getTicket(id){
        return Ticket.findByPk(id)
    },

    getAllTicket(){
        return Ticket.findAll({
            include: [{ all: true, nested: true }],
          })
    },

    getTotalCount(){
        return Ticket.count()
    }
}