const { User } = require('../models')

module.exports = {
    create(body){
        return User.create(body)
    },

    findUser(condition){
        return User.findOne({where: condition})
    },

    findUserByPk(id){
        return User.findByPk(id)
    },

    update(id, update){
        return User.update(update, {
            where: {
                id
            }
        })
    },

    delete(id){
        return User.destroy({
            where : { id }
        })
    },

    findAll(condition) {
        return User.findAll({
            where : condition
        });
    },

    getTotalUser(condition) {
        return User.count({
            where: condition
        });
    },



}