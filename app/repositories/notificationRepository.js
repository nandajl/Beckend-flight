const { Notification, User, Transaction, Ticket, Flight, Plane, Airport } = require("../models")

module.exports = {
    create(body){
        return Notification.create(body)
    },

    update(id, body){
        return Notification.update(body, {
            where: {
                id
            }
        })
    },
    
    getNotification(id){
        return Notification.findByPk(id)
    },

    findUserNotification(condition){
        return Notification.findAll({
            where: condition,
            include: [ 
                { model: User }, 
                { model: Transaction,
                    include: [{ model: Ticket,
                        include: [{ model: Flight,
                          include: [
                            { model: Plane },
                            { model: Airport, as: 'from' },
                            { model: Airport, as: 'to' }
                          ]  
                        }]}]
                }, 
            ]
        })
    },

    getTotalCount(condition){
        return Notification.count({where: condition})
    }
}