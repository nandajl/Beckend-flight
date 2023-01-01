const planeRepository = require("../../app/repositories/planeRepository");
const planeService = require("../../app/services/planeService");

const {
    create,
    destroy,
    getAllPlane,
    getPlane,
    update
} = planeService

const mockPlane = {
    id: 1,
    name: 'Citylink',
    capacity: 100,
    status: 'Available',
    createdAt: new Date(),
    updatedAt: new Date(),
};

const mockPlaneRes = {
    id: mockPlane.id,
    name: mockPlane.name,
    capacity: mockPlane.capacity,
    status: mockPlane.status,
    createdAt: new Date(),
    updatedAt: new Date(),
}

const err = new Error("eror bro");

describe('create', () => {
    it('should return data plane if create success', async() => {
        const body = mockPlane;

        planeRepository.create = jest.fn().mockResolvedValue(mockPlaneRes);

        const result = await create(body);

        expect(result).toEqual(mockPlaneRes);
        expect(planeRepository.create).toHaveBeenCalled();
    });
});

describe('update', () => {
    it('should return data plane if update success', async() => {
        const body = mockPlane;
        const id = mockPlane.id;

        planeRepository.update = jest.fn().mockResolvedValue(mockPlaneRes);

        const result = await update(id, body);

        expect(result).toEqual(mockPlaneRes);
        expect(planeRepository.update).toHaveBeenCalled();
    });
});

describe('getAllPlane', () => {
    it('should return all plane', async () => {
        const planes = [];

        planes.push({
            ...mockPlaneRes
        });

        const count = planes.length;

        planeRepository.getAllPlanes = jest.fn().mockResolvedValue(planes);
        planeRepository.getTotalCount = jest.fn().mockResolvedValue(count);

        const result = await getAllPlane();

        expect(result).toEqual({
            data: planes,
            count: count
        });
        expect(planeRepository.getAllPlanes).toHaveBeenCalled();
    });
    it('should throw err if request failed', async () => {
        planeRepository.getAllPlanes = jest.fn().mockRejectedValue(err);

        await getAllPlane();

        expect(err.message).toEqual(err.message);
    })
});

describe('getPlane', () => {
    it('should return data planes by id', async () => {
        const id = mockPlane.id

        planeRepository.getPlane = jest.fn().mockResolvedValue(mockPlaneRes);

        const result = await getPlane(id);

        expect(result).toEqual(mockPlaneRes);
        expect(planeRepository.getPlane).toHaveBeenCalled();
    });
});

describe('destroy', () => {
    it('should return if plane success delete', async () => {
        const id = mockPlane.id

        planeRepository.destroy = jest.fn().mockResolvedValue(null);

        const result = await destroy();

        expect(result).toBeNull();
        expect(planeRepository.destroy).toHaveBeenCalled();
    });
});