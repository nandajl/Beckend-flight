const ticketRepository = require("../repositories/ticketRepository")

module.exports = {
    create(body){
        return ticketRepository.create(body)
    },

    update(id, body){
        return ticketRepository.update(id, body)
    },

    delete(id){
        return ticketRepository.delete(id)
    },

    getTicket(id){
        return ticketRepository.getTicket(id)
    },

    async getAllTicket(){
        try {
            const tickets = await ticketRepository.getAllTicket()
            const count = await ticketRepository.getTotalCount()
            return{
                data: tickets,
                count: count
            }
        } catch (err) {
            throw err
        }
    }


    
}