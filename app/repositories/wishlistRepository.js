const { Wishlist, User, Ticket, Flight, Airport, Plane } = require("../models")

module.exports = {
    create(body){
        return Wishlist.create(body)
    },

    update(id, body){
        return Wishlist.update(body, {
            where: {
                id
            }
        })
    },

    getAllWishlists(){
        return Wishlist.findAll({
            include: [ { all: true } ]
        })
    },

    getWishlist(id){
        return Wishlist.findByPk(id)
    },

    findUserWishlist(condition){
        return Wishlist.findAll({
            include: [ 
                { model:User },
                { model:Ticket, 
                  include: [
                    { model: Flight,
                      include: [
                        { model: Plane },
                        { model: Airport, as: 'from' },
                        { model: Airport, as: 'to' }
                      ]  
                    }
                  ]
                },
            ],
            where: condition
        })
    },

    delete(id){
        return Wishlist.destroy({
            where : {
                id
            }
        })
    },

    getTotalCount(){
        return Wishlist.count()
    }
}