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

    async findNotification(id){
        try {
            const notifications = await  notificationRepository.findUserNotification({user_id : id})
            const count = await notificationRepository.getTotalCount({user_id : id})
            return {
                data: notifications,
                count: count
            }
        } catch (err) {
            return err
        }
    }
}