const promoRepository = require("../../app/repositories/promoRepository");
const { Promo } = require('../../app/models')

const {
    create,
    destroy,
    findById,
    findPromo,
    getAll,
    getTotalCount,
    update
} = promoRepository

const mockPromo = {
    id: 1,
    name: 'Summer Sale',
    code: 'SS12',
    discount: 50000,
    description: 'Hot summer sale'
};

const mockPromoRes = {
    id: mockPromo.id,
    name: mockPromo.name,
    code: mockPromo.code,
    discount: mockPromo.discount,
    description: mockPromo.description,
    photo: null,
    createdAt: new Date(),
    updatedAt: new Date,
};

describe('create', () => {
    it('should return data promo if create success', async() => {
        const body = mockPromo;
        Promo.create = jest.fn().mockResolvedValue(mockPromoRes)

        const result = await create(body);

        expect(result).toEqual(mockPromoRes);
    });
});

describe('update', () => {
    it('should return data promo if update success', async() => {
        const body = mockPromo;
        const id = mockPromo.id;
        Promo.update = jest.fn().mockResolvedValue(mockPromoRes)

        const result = await update(id, body);

        expect(result).toEqual(mockPromoRes);
    });
});

describe('getAll', () => {
    it('should return all data promo if request success', async() => {
        const mockPromoList = [];

        mockPromoList.push({
            ...mockPromoRes
        });

        Promo.findAll = jest.fn().mockResolvedValue(mockPromoList)

        const result = await getAll();

        expect(result).toEqual(mockPromoList);
    });
}); 

describe('getTotalCount', () => {
    it('should return count data promo if request success', async() => {
        const mockPromoList = [];

        mockPromoList.push({
            ...mockPromoRes
        });

        const count = mockPromoList.length;

        Promo.count = jest.fn().mockResolvedValue(count)

        const result = await getTotalCount();

        expect(result).toEqual(count);
    });
}); 

describe('findById', () => {
    it('should return data promo by id if request success', async() => {
        const id = mockPromo.id
        Promo.findByPk = jest.fn().mockResolvedValue(mockPromo)

        const result = await findById(id);

        expect(result).toEqual(mockPromo);
    });
});

describe('destroy', () => {
    it('should return if delete success', async() => {
        const id = mockPromo.id
        Promo.destroy = jest.fn().mockResolvedValue(1)

        const result = await destroy();

        expect(result).toEqual(1);
    });
}); 

describe('findPromo', () => {
    it('should return all data promo by user id', async () => {
        const condition = {
            code: mockPromo.code
        }

        Promo.findOne = jest.fn().mockResolvedValue(mockPromoRes)

        const result = await findPromo(condition);

        expect(result).toEqual(mockPromoRes);
    })
})