const {
    handleCreatePromo,
    handleGetAllPromo,
    handleUpdatePromo,
    handleGetByIdPromo,
    handleDeletePromo,
    handleFindPromo
} = require("../app/controllers/api/v1/promoController");

const dayjs = require('dayjs')
const now = dayjs();
const isoDate = now.toISOString();

const date = new Date()

const mockPromo = {
    id: 1,
    name: 'Summer Sale',
    code: 'SS12',
    discount: 50000,
    description: 'Hot summer sale',
    photo: null,
    createdAt: isoDate,
    updatedAt: isoDate,
};


const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};


describe("promoController", () => {
    describe("handleCreatePromo", () => {
        it('should creates a new promo', async () => {

            const mockReq = {
                body: {
                    name: mockPromo.name,
                    code: mockPromo.code,
                    discount: mockPromo.discount,
                    description: mockPromo.description
                }
            }

            await handleCreatePromo(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: 'Ok',
                data: {
                    id: mockPromo.id,
                    name: mockPromo.name,
                    code: mockPromo.code,
                    discount: mockPromo.discount,
                    description: mockPromo.description,
                    photo: null,
                    createdAt: isoDate,
                    updatedAt: isoDate,
                }
            });
        })
    });

    describe('handleGetAllPromo', () => {
        test('returns a list of all promos', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };

            const mockPromoList = []

            mockPromoList.push({
                ...mockPromo
            })

            await handleGetAllPromo(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 'Ok',
                data: mockPromoList
            });
        });
    });

    describe('handleUpdatePromo', () => {
        test('updates an existing promo', async () => {
            const req = {
                body: {
                    name: mockPromo.name,
                    discount: mockPromo.discount
                },
                file: {
                    photo: mockPromo.photo
                },
                params: {
                    id: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };

            await handleUpdatePromo(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 'OK',
                message: mockPromo
            });
        });
    });

    describe('handleGetByIdPromo', () => {
        test('returns a promo by itsID', async () => {
            const req = {
                params: {
                    id: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };

            await handleGetByIdPromo(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 'OK',
                data: mockPromo
            });
        });
    });

    describe('handleFindPromo', () => {
        test('finds a promo by its code', async () => {
            const req = {
                body: {
                    code: mockPromo.code
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };
            await handleFindPromo(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 'OK',
                data: mockPromo
            });
        });
    });

    describe('handleDeletePromo', () => {
        test('deletes a promo by its ID', async () => {
            const req = {
                params: {
                    id: 1
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                end: jest.fn().mockReturnThis()
            };

            await handleDeletePromo(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.end).toHaveBeenCalled();
        });
    });
});