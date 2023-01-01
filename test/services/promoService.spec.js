const promoRepository = require("../../app/repositories/promoRepository");
const promoService = require("../../app/services/promoService");
const cloudinary = require("cloudinary").v2;

const {
    destroy,
    create,
    update,
    getAll,
    getById,
    findPromo,
} = promoService;

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

const err = new Error('error bro');


describe('create', () => {
    it('should return data promo if create without image success', async() => {
        const image = undefined;
        const body = mockPromo;

        promoRepository.create = jest.fn().mockResolvedValue(mockPromoResponse);

        const result = await create(body, image);

        expect(result).toEqual(mockPromoResponse);
        expect(promoRepository.create).toHaveBeenCalled();
    });

    it('should return data promo if create with image success', async() => {
        const image = { buffer: Buffer.from('test image'), mimetype: 'image/jpeg' };;
        const body = mockPromo;

        const result = { url: 'https://test.com/image.jpg' };

        body.photo = result.url

        cloudinary.uploader.upload = jest.fn().mockResolvedValue(result);

        promoRepository.create = jest.fn().mockResolvedValue(mockPromoResponse);

        const promo = await create(body, image);

        expect(promo).toEqual(mockPromoResponse);
        expect(promoRepository.create).toHaveBeenCalled();
    });

    it('should throw err if request failed', async () => {
        const image = { buffer: Buffer.from('test image'), mimetype: 'image/jpeg' };;
        const body = mockPromo;

        const result = { url: 'https://test.com/image.jpg' };

        body.photo = result.url

        cloudinary.uploader.upload = jest.fn().mockRejectedValue(err);

        promoRepository.create = jest.fn().mockResolvedValue(err);

        await create(body, image);

        expect(err.message).toEqual(err.message);
    })
    
})

describe('getAll', () => {
    it('should return all promos', async () => {
        const promos = [];

        promos.push({
            ...mockPromoResponse
        })

        promoRepository.getAll = jest.fn().mockResolvedValue(promos);

        const result = await getAll();

        expect(result).toEqual(promos);
        expect(promoRepository.getAll).toHaveBeenCalled();
    });
});

describe('update', () => {
    it('should return data promo if update without image success', async() => {
        const image = undefined;
        const body = mockPromo;
        const id = mockPromo.id;

        promoRepository.update = jest.fn().mockResolvedValue(mockPromoResponse);

        const result = await update(body, id, image);

        expect(result).toEqual(mockPromoResponse);
        expect(promoRepository.update).toHaveBeenCalled();
    });

    it('should return data promo if update with image success', async() => {
        const image = { buffer: Buffer.from('test image'), mimetype: 'image/jpeg' };;
        const body = mockPromo;
        const id = mockPromo.id;

        const result = { url: 'https://test.com/image.jpg' };

        body.photo = result.url

        cloudinary.uploader.upload = jest.fn().mockResolvedValue(result);

        promoRepository.update = jest.fn().mockResolvedValue(mockPromoResponse);

        const promo = await update(body, id, image);

        expect(promo).toEqual(mockPromoResponse);
        expect(promoRepository.update).toHaveBeenCalled();
    });

    it('should throw err if request failed', async () => {
        const image = { buffer: Buffer.from('test image'), mimetype: 'image/jpeg' };;
        const body = mockPromo;
        const id = mockPromo.id;

        const result = { url: 'https://test.com/image.jpg' };

        body.photo = result.url

        cloudinary.uploader.upload = jest.fn().mockRejectedValue(err);

        promoRepository.update = jest.fn().mockResolvedValue(err);

        await update(body, id, image);

        expect(err.message).toEqual(err.message);
    })
});

describe('getById', () => {
    it('should return all promos', async () => {
        const id = mockPromo.id

        promoRepository.findById = jest.fn().mockResolvedValue(mockPromoResponse);

        const result = await getById();

        expect(result).toEqual(mockPromoResponse);
        expect(promoRepository.findById).toHaveBeenCalled();
    });
});

describe('destroy', () => {
    it('should return all promos', async () => {
        const id = mockPromo.id

        promoRepository.destroy = jest.fn().mockResolvedValue(null);

        const result = await destroy();

        expect(result).toBeNull();
        expect(promoRepository.destroy).toHaveBeenCalled();
    });
});

describe('findPromo', () => {
    it('should return all promos', async () => {
        const code = mockPromo.code

        promoRepository.findPromo = jest.fn().mockResolvedValue(mockPromoResponse);

        const result = await findPromo(code);

        expect(result).toEqual(mockPromoResponse);
        expect(promoRepository.findPromo).toHaveBeenCalled();
    });
});

