const wishlistRepository = require("../../app/repositories/wishlistRepository");
const wishlistService = require("../../app/services/wishlistService");

const {
    create,
    destroy,
    findWishlist,
    getAllWishlist,
    getWishlist,
    update
} = wishlistService

const mockWishlist = {
    id: 1,
    ticket_id: 2,
    user_id: 2,
};

const mockWishlistRes = {
    id: mockWishlist.id,
    ticket_id: mockWishlist.ticket_id,
    user_id: mockWishlist.user_id,
    createdAt: new Date(),
    updatedAt: new Date()
}

const err = new Error("eror bro");

describe('create', () => {
    it('should return data wishlist if create success', async() => {
        const body = mockWishlist;

        wishlistRepository.create = jest.fn().mockResolvedValue(mockWishlistRes);

        const result = await create(body);

        expect(result).toEqual(mockWishlistRes);
        expect(wishlistRepository.create).toHaveBeenCalled();
    });
});
describe('update', () => {
    it('should return data wishlist if update success', async() => {
        const body = mockWishlist;
        const id = mockWishlist.id;

        wishlistRepository.update = jest.fn().mockResolvedValue(mockWishlistRes);

        const result = await update(id, body);

        expect(result).toEqual(mockWishlistRes);
        expect(wishlistRepository.update).toHaveBeenCalled();
    });
});
describe('getAllWishlist', () => {
    it('should return all wishlist', async () => {
        const wishlists = [];

        wishlists.push({
            ...mockWishlistRes
        });

        const count = wishlists.length;

        wishlistRepository.getAllWishlists = jest.fn().mockResolvedValue(wishlists);
        wishlistRepository.getTotalCount = jest.fn().mockResolvedValue(count);

        const result = await getAllWishlist();

        expect(result).toEqual({
            data: wishlists,
            count: count
        });
        expect(wishlistRepository.getAllWishlists).toHaveBeenCalled();
    });
    it('should throw err if request failed', async () => {
        wishlistRepository.getAllWishlists = jest.fn().mockRejectedValue(err);

        await getAllWishlist();

        expect(err.message).toEqual(err.message);
    })
});

describe('getWishlist', () => {
    it('should return data wishlists by id', async () => {
        const id = mockWishlist.id

        wishlistRepository.getWishlist = jest.fn().mockResolvedValue(mockWishlistRes);

        const result = await getWishlist(id);

        expect(result).toEqual(mockWishlistRes);
        expect(wishlistRepository.getWishlist).toHaveBeenCalled();
    });
});

describe('destroy', () => {
    it('should return if wishlist success delete', async () => {
        const id = mockWishlist.id

        wishlistRepository.destroy = jest.fn().mockResolvedValue(null);

        const result = await destroy();

        expect(result).toBeNull();
        expect(wishlistRepository.destroy).toHaveBeenCalled();
    });
});

describe('findWishlist', () => {
    it('should return data wishlists by user id', async () => {
        const id = mockWishlist.user_id

        wishlistRepository.findUserWishlist = jest.fn().mockResolvedValue(mockWishlistRes);

        const result = await findWishlist(id);

        expect(result).toEqual(mockWishlistRes);
        expect(wishlistRepository.findUserWishlist).toHaveBeenCalled();
    });
});

