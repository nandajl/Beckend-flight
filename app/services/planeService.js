const planeRepository = require("../repositories/planeRepository")

module.exports = {
    create(body){
        return planeRepository.create(body)
    },

    update(id, body){
        return planeRepository.update(id, body)
    },

    getPlane(id){
        return planeRepository.getPlane(id)
    },

    async getAllPlane(){
        try {
            const planes = await planeRepository.getAllPlanes()
            const count = await planeRepository.getTotalCount()
            return {
                data: planes,
                count: count
            }
        } catch (err) {
            throw err
        }
    },

    delete(id){
        return planeRepository.delete(id)
    }

}