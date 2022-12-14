const notificationRepository = require("../repositories/notificationRepository")

module.exports = {
    create(body){
        return notificationRepository.create(body)
    },

    update(id, body){
        return notificationRepository.update(id, body)
    },

    getNotification(id){
        return notificationRepository.getNotification(id)
    },

    async getAllNotification(){
        try {
            const notifications = await notificationRepository.getAllNotifications()
            const count = await notificationRepository.getTotalCount()
            return {
                data: notifications,
                count: count
            }
        } catch (err) {
            throw err
        }
    },

    delete(id){
        return notificationRepository.delete(id)
    }
}