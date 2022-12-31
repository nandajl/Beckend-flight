const planeController = require("../../app/controllers/api/v1/planeController");
const planeService = require("../../app/services/planeService");
const {
    handleCreatePlane,
    handleUpdatePlane,
    handleListPlane,
    handleGetPlane,
    handleDeletePlane
} = planeController;

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

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};


const err = new Error("eror bro")

describe('handleCreatePlane', () => {
    it('should return a 201 status and creates a new plane', async () => {
        const mockReq = {
            body: {
                name: mockPlane.name,
                capacity: mockPlane.capacity,
                status: mockPlane.status,
            }
        }

        planeService.create = jest.fn(() => Promise.resolve(mockPlaneRes));

        await handleCreatePlane(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockPlaneRes
        });
    });

    it('should return a 400 if create plane failed', async () => {
        const mockReq = {
            body: {
                name: mockPlane.name,
                capacity: mockPlane.capacity,
                status: mockPlane.status,
            }
        }

        planeService.create = jest.fn().mockReturnValue(Promise.reject(err));

        await handleCreatePlane(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    });
});

describe('handleListPlane', () => {
    it('should returns a list of all planes', async () => {
        const mockReq = {};

        const mockPlaneList = []

        mockPlaneList.push({
            ...mockPlaneRes
        })

        const count = mockPlaneList.length;

        planeService.getAllPlane = jest.fn(() => Promise.resolve({data: mockPlaneList, count: count}));

        await handleListPlane(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockPlaneList,
            total: count
        });
    });

    it('should return a 400 if get list plane failed', async () => {
        const mockReq = {};

        planeService.getAllPlane = jest.fn().mockReturnValue(Promise.reject(err));

        await handleListPlane(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleUpdatePlane', () => {
    it('should return status 201 and updates an existing plane success', async () => {
        const mockReq = {
            body: {
                name: mockPlane.name
            },
            params: {
                id: mockPlane.id
            }
        }

        planeService.update = jest.fn(() => Promise.resolve(mockPlaneRes));

        await handleUpdatePlane(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockReq.body
        });
    });

    it('should return a 400 if update plane failed', async () => {
        const mockReq = {
            body: {
                name: mockPlane.name
            },
            params: {
                id: mockPlane.id
            }
        }

        planeService.update = jest.fn().mockRejectedValue(err);

        await handleUpdatePlane(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleGetPlane', () => {
    it('returns a plane by itsID', async () => {
        const mockReq = {
            params: {
                id: mockPlane.id
            }
        };

        planeService.getPlane = jest.fn(() => Promise.resolve(mockPlaneRes));

        await handleGetPlane(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockPlaneRes
        });
    });

    it('should return a 400 if get plane by id failed', async () => {
        const mockReq = {
            params: {
                id: mockPlane.id
            }
        };

        planeService.getPlane = jest.fn().mockReturnValue(Promise.reject(err));

        await handleGetPlane(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleDeletePlane', () => {
    it('delete a plane by its ID', async () => {
        const mockReq = {
            params: {
                id: mockPlane.id
            }
        };

        planeService.delete = jest.fn().mockReturnThis()

        await handleDeletePlane(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            message: "Plane successfully deleted"
        });
    });
    it('should return a 400 if request failed', async () => {
        const mockReq = {
            params: {
                id: mockPlane.id
            }
        };

        planeService.delete = jest.fn().mockReturnValue(Promise.reject(err));

        await handleDeletePlane(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});