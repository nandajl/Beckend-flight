const { promoController } = require("../app/controllers/api/v1");
const { handleCreatePromo } = promoController;
const dayjs = require('dayjs')
const now = dayjs();
const isoDate = now.toISOString();

const date = new Date()

const mockPromo = {
    id: '1',
    name: 'Summer Sale',
    code: 'SS12',
    discount: 50000,
    description: 'Hot summer sale',
    photo: null,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnValue({})
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
                data: mockPromo
        });
    })
})
})
