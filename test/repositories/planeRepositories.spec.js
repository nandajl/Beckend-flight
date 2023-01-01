const planeRepository = require("../../app/repositories/planeRepository");
const { Plane } = require('../../app/models')

const {
    create,
    destroy,
    getAllPlanes,
    getPlane,
    getTotalCount,
    update
} = planeRepository

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

describe('create', () => {
    it('should return data plane if create success', async() => {
        const body = mockPlane;
        Plane.create = jest.fn().mockResolvedValue(mockPlaneRes)

        const result = await create(body);

        expect(result).toEqual(mockPlaneRes);
    });
});

describe('update', () => {
    it('should return data plane if update success', async() => {
        const body = mockPlane;
        const id = mockPlane.id;
        Plane.update = jest.fn().mockResolvedValue(mockPlaneRes)

        const result = await update(id, body);

        expect(result).toEqual(mockPlaneRes);
    });
});

describe('getAllPlanes', () => {
    it('should return all data plane if request success', async() => {
        const mockPlaneList = [];

        mockPlaneList.push({
            ...mockPlaneRes
        });

        Plane.findAll = jest.fn().mockResolvedValue(mockPlaneList)

        const result = await getAllPlanes();

        expect(result).toEqual(mockPlaneList);
    });
}); 

describe('getTotalCount', () => {
    it('should return count data plane if request success', async() => {
        const mockPlaneList = [];

        mockPlaneList.push({
            ...mockPlaneRes
        });

        const count = mockPlaneList.length;

        Plane.count = jest.fn().mockResolvedValue(count)

        const result = await getTotalCount();

        expect(result).toEqual(count);
    });
}); 

describe('getPlane', () => {
    it('should return data plane by id if request success', async() => {
        const id = mockPlane.id
        Plane.findByPk = jest.fn().mockResolvedValue(mockPlane)

        const result = await getPlane(id);

        expect(result).toEqual(mockPlane);
    });
});

describe('destroy', () => {
    it('should return if delete success', async() => {
        const id = mockPlane.id
        Plane.destroy = jest.fn().mockResolvedValue(1)

        const result = await destroy();

        expect(result).toEqual(1);
    });
}); 