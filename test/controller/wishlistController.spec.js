const wishlistController = require("../../app/controllers/api/v1/wishlistController");
const wishlistService = require("../../app/services/wishlistService");

const {
    handleCreateWishlist,
    handleListWishlist,
    handleGetWishlist,
    handleFindWishlist,
    handleDeleteWishlist
} = wishlistController;

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

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};

const err = new Error("eror bro");

describe('handleCreateWishlist', () => {
    it('should return a 201 status and creates a new wishlist', async () => {
        const mockReq = {
            body: {
                ticket_id: mockWishlist.ticket_id,
                user_id: mockWishlist.user_id,
            }
        }
        
        wishlistService.create = jest.fn(() => Promise.resolve(mockWishlistRes));

        await handleCreateWishlist(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockWishlistRes
        });
    });

    it('should return a 401 if create wishlist failed', async () => {
        const mockReq = {
            body: {
                ticket_id: mockWishlist.ticket_id,
                user_id: mockWishlist.user_id,
            }
        }

        wishlistService.create = jest.fn().mockReturnValue(Promise.reject(err));

        await handleCreateWishlist(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    });
});

describe('handleListWishlist', () => {
    it('should returns a list of all wishlist', async () => {
        const mockReq = {};

        const mockWishlistList = []

        mockWishlistList.push({
            ...mockWishlistRes
        })

        const count = mockWishlistList.length;

        wishlistService.getAllWishlist = jest.fn(() => Promise.resolve({data: mockWishlistList, count: count}));

        await handleListWishlist(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockWishlistList,
            total: count
        });
    });

    it('should return a 401 if get list wishlist failed', async () => {
        const mockReq = {};

        wishlistService.getAllWishlist = jest.fn().mockReturnValue(Promise.reject(err));

        await handleListWishlist(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleGetWishlist', () => {
    it('returns a wishlist by its ID', async () => {
        const mockReq = {
            params: {
                id: mockWishlist.id
            }
        };

        wishlistService.getWishlist = jest.fn(() => Promise.resolve(mockWishlistRes));

        await handleGetWishlist(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockWishlistRes
        });
    });

    it('should return a 401 if get wishlist by id failed', async () => {
        const mockReq = {
            params: {
                id: mockWishlist.id
            }
        };

        wishlistService.getWishlist = jest.fn().mockReturnValue(Promise.reject(err));

        await handleGetWishlist(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleFindWishlist', () => {
    it('finds a wishlist by its user id', async () => {
        const mockReq = {
            params: {
                id: mockWishlist.user_id
            }
        };

        const mockWishlistList = []

        mockWishlistList.push({
            ...mockWishlistRes
        })

        wishlistService.findWishlist = jest.fn(() => Promise.resolve(mockWishlistList));

        await handleFindWishlist(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockWishlistList
        });
    });

    it('should return a 400 if find wishlist failed', async () => {
        const mockReq = {
            params: {
                id: mockWishlist.user_id
            }
        };

        wishlistService.findWishlist = jest.fn().mockReturnValue(Promise.reject(err));

        await handleFindWishlist(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleDeleteWishlist', () => {
    it('delete a wishlist by its ID', async () => {
        const mockReq = {
            params: {
                id: mockWishlist.id
            }
        };

        wishlistService.delete = jest.fn().mockReturnThis()

        await handleDeleteWishlist(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            message: "Wishlist successfully deleted"
        });
    });
    it('should return a 401 if request failed', async () => {
        const mockReq = {
            params: {
                id: mockWishlist.id
            }
        };

        wishlistService.delete = jest.fn().mockReturnValue(Promise.reject(err));

        await handleDeleteWishlist(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});