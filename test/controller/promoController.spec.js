const promoController = require("../../app/controllers/api/v1/promoController")
const {
    handleCreatePromo,
    handleGetAllPromo,
    handleUpdatePromo,
    handleGetByIdPromo,
    handleDeletePromo,
    handleFindPromo
} = promoController;
const promoService = require("../../app/services/promoService")

const mockPromo = {
    id: 1,
    name: 'Summer Sale',
    code: 'SS12',
    discount: 50000,
    description: 'Hot summer sale'
};

const mockPromoResponse = {
    id: mockPromo.id,
    name: mockPromo.name,
    code: mockPromo.code,
    discount: mockPromo.discount,
    description: mockPromo.description,
    photo: null,
    createdAt: new Date(),
    updatedAt: new Date,
};




const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};


describe("handleCreatePromo", () => {
    it('should return a 201 status and creates a new promo', async () => {
        const mockReq = {
            body: {
                name: mockPromo.name,
                code: mockPromo.code,
                discount: mockPromo.discount,
                description: mockPromo.description
            }
        }

        promoService.create = jest.fn(() => Promise.resolve(mockPromoResponse));

        await handleCreatePromo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'Ok',
            data: mockPromoResponse
        });
    }),

    it('should return a 400 if create promo failed', async () => {
        const mockReq = {
            body: {
                name: mockPromo.name,
                code: mockPromo.code,
                discount: mockPromo.discount,
                description: mockPromo.description
            }
        }

        const err = new Error("eror bro")

        promoService.create = jest.fn().mockReturnValue(Promise.reject(err));

        await handleCreatePromo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleGetAllPromo', () => {
    it('should returns a list of all promos', async () => {
        const mockReq = {};

        const mockPromoList = []

        mockPromoList.push({
            ...mockPromoResponse
        })

        promoService.getAll = jest.fn(() => Promise.resolve(mockPromoList));

        await handleGetAllPromo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'Ok',
            data: mockPromoList
        });
    });

    it('should return a 400 if get list promo failed', async () => {
        const mockReq = {};

        const mockPromoList = []

        const err = new Error("eror bro")

        promoService.getAll = jest.fn().mockReturnValue(Promise.reject(err));

        await handleGetAllPromo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleUpdatePromo', () => {
    it('should return status 201 and updates an existing promo success', async () => {
        const mockReq = {
            body: {
                name: mockPromo.name
            },
            params: {
                id: mockPromo.id
            }
        }

        promoService.update = jest.fn(() => Promise.resolve(mockPromoResponse));

        await handleUpdatePromo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            message: mockPromoResponse
        });
    });

    it('should return a 400 if update promo failed', async () => {
        const mockReq = {
            body: {
                name: mockPromo.name
            },
            params: {
                id: mockPromo.id
            }
        }

        const err = new Error("eror")

        promoService.update = jest.fn().mockRejectedValue(err);

        await handleUpdatePromo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleGetByIdPromo', () => {
    it('returns a promo by itsID', async () => {
        const mockReq = {
            params: {
                id: mockPromo.id
            }
        };

        promoService.getById = jest.fn(() => Promise.resolve(mockPromoResponse));

        await handleGetByIdPromo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockPromoResponse
        });
    });

    it('should return a 400 if get promo by id failed', async () => {
        const mockReq = {
            params: {
                id: mockPromo.id
            }
        };

        const err = new Error("eror bro")

        promoService.getById = jest.fn().mockReturnValue(Promise.reject(err));

        await handleGetByIdPromo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            data: err.message
        });
    })
});

describe('handleFindPromo', () => {
    it('finds a promo by its code', async () => {
        const mockReq = {
            body: {
                code: mockPromo.code
            }
        };

        promoService.findPromo = jest.fn(() => Promise.resolve(mockPromoResponse));

        await handleFindPromo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockPromoResponse
        });
    });

    it('should return a 400 if find promo failed', async () => {
        const mockReq = {
            body: {
                code: mockPromo.code
            }
        };

        const err = new Error("eror bro")

        promoService.findPromo = jest.fn().mockReturnValue(Promise.reject(err));

        await handleFindPromo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            data: err.message
        });
    })
});

describe('handleDeletePromo', () => {
    it('delete a promo by its ID', async () => {
        const mockReq = {
            params: {
                id: mockPromo.id
            }
        };

        promoService.delete = jest.fn().mockReturnThis()

        await handleDeletePromo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
    });
});