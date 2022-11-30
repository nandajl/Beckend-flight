const userRepository  = require("../repositories/userRepository")

module.exports = {
    create(requestBody) {
        return userRepository.create(requestBody);
    },
    
    update(id, requestBody) {
        return userRepository.update(id, requestBody);
    },

    delete(id) {
        return userRepository.delete(id);
    },

    async list(role) {
        try {
            const users = await userRepository.findAll({role});
            const userCount = await userRepository.getTotalUser({role});

            return {
                data: users,
                count: userCount,
            };
        } catch (err) {
            throw err;
        }
    },

    get(id) {
        const condition = {id: id}
        return userRepository.findUser(condition);
    }
}