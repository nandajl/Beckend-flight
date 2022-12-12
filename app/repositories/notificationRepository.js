const { Notification } = require("../models")

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

    getAllNotifications(){
        return Notification.findAll({
            include: [ { all: true, nested: true } ]
        })
    },

    getNotification(id){
        return Notification.findByPk(id)
    },

    delete(id){
        return Notification.destroy({
            where : {
                id
            }
        })
    },

    getTotalCount(){
        return Notification.count()
    }
}