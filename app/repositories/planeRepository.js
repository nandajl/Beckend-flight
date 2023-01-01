const { Plane } = require("../models")

module.exports = {
    create(body){
        return Plane.create(body)
    },

    update(id, body){
        return Plane.update(body, {
            where: {
                id
            }
        })
    },

    getAllPlanes(){
        return Plane.findAll()
    },

    getPlane(id){
        return Plane.findByPk(id)
    },

    destroy(id){
        return Plane.destroy({
            where : {
                id
            }
        })
    },

    getTotalCount(){
        return Plane.count()
    }

}