const { Ticket, Airport, Plane, Flight } = require("../models")

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
        return Ticket.findByPk(id, {
            include: [{ model: Flight,
                include: [
                  { model: Plane },
                  { model: Airport, as: 'from' },
                  { model: Airport, as: 'to' }
                ]  
              }]
        })
    },

    getAllTicket(){
        return Ticket.findAll({
            include: [{ model: Flight,
                include: [
                  { model: Plane },
                  { model: Airport, as: 'from' },
                  { model: Airport, as: 'to' }
                ]  
              }],
          })
    },

    getTotalCount(){
        return Ticket.count()
    }
}