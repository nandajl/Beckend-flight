const wishlistRepository = require("../../app/repositories/wishlistRepository");
const { Wishlist } = require('../../app/models')

const {
    create,
    destroy,
    findUserWishlist,
    getAllWishlists,
    getTotalCount,
    getWishlist,
    update
} = wishlistRepository

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

describe('create', () => {
    it('should return data wishlist if create success', async() => {
        const body = mockWishlist;
        Wishlist.create = jest.fn().mockResolvedValue(mockWishlistRes)

        const result = await create(body);

        expect(result).toEqual(mockWishlistRes);
    });
});

describe('update', () => {
    it('should return data wishlist if update success', async() => {
        const body = mockWishlist;
        const id = mockWishlist.id;
        Wishlist.update = jest.fn().mockResolvedValue(mockWishlistRes)

        const result = await update(id, body);

        expect(result).toEqual(mockWishlistRes);
    });
});

describe('getAllWishlists', () => {
    it('should return all data wishlist if request success', async() => {
        const mockWishlistList = [];

        mockWishlistList.push({
            ...mockWishlistRes
        });

        Wishlist.findAll = jest.fn().mockResolvedValue(mockWishlistList)

        const result = await getAllWishlists();

        expect(result).toEqual(mockWishlistList);
    });
}); 

describe('getTotalCount', () => {
    it('should return count data wishlist if request success', async() => {
        const mockWishlistList = [];

        mockWishlistList.push({
            ...mockWishlistRes
        });

        const count = mockWishlistList.length;

        Wishlist.count = jest.fn().mockResolvedValue(count)

        const result = await getTotalCount();

        expect(result).toEqual(count);
    });
}); 

describe('getWishlist', () => {
    it('should return data wishlist by id if request success', async() => {
        const id = mockWishlist.id
        Wishlist.findByPk = jest.fn().mockResolvedValue(mockWishlist)

        const result = await getWishlist(id);

        expect(result).toEqual(mockWishlist);
    });
});

describe('destroy', () => {
    it('should return if delete success', async() => {
        const id = mockWishlist.id
        Wishlist.destroy = jest.fn().mockResolvedValue(1)

        const result = await destroy();

        expect(result).toEqual(1);
    });
}); 

describe('findUserWishlist', () => {
    it('should return all data wishlist by user id', async () => {
        const condition = {
            user_id: mockWishlist.user_id
        }
        const mockWishlistList = [];

        mockWishlistList.push({
            ...mockWishlistRes
        });

        Wishlist.findAll = jest.fn().mockResolvedValue(mockWishlistList)

        const result = await findUserWishlist(condition);

        expect(result).toEqual(mockWishlistList);
    })
})