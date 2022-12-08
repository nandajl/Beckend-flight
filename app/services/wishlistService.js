const wishlistRepository = require("../repositories/wishlistRepository")

module.exports = {
    create(body){
        return wishlistRepository.create(body)
    },

    update(id, body){
        return wishlistRepository.update(id, body)
    },

    getWishlist(id){
        return wishlistRepository.getWishlist(id)
    },

    async getAllWishlist(){
        try {
            const wishlists = await wishlistRepository.getAllWishlists()
            const count = await wishlistRepository.getTotalCount()
            return {
                data: wishlists,
                count: count
            }
        } catch (err) {
            throw err
        }
    },

    delete(id){
        return wishlistRepository.delete(id)
    }
}