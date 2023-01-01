const airportController = require("../../app/controllers/api/v1/airportController");
const airportService = require("../../app/services/airportService");

const {
    handleCreateAirport,
    handleUpdateAirport,
    handleGetAllAirport,
    handleGetByPk,
    handleDeleteAirport
} = airportController;

const mockAirport = {
    name: 'Kertajati',
    city: 'Majalengka',
    city_code: 'MJK',
    country: 'Indonesia'
}

const mockAirportRes = {
    name: mockAirport.name,
    city: mockAirport.city,
    city_code: mockAirport.city_code,
    country: mockAirport.country,
    createdAt: new Date(),
    updatedAt: new Date(),
}

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};

const err = new Error("eror bro");

describe('handleCreateAirport', () => {
    it('should return a 201 status and creates a new airport', async () => {
        const mockReq = {
            body: {
                name: mockAirport.name,
                city: mockAirport.city,
                city_code: mockAirport.city_code,
                country: mockAirport.country,
            }
        }
        
        airportService.create = jest.fn(() => Promise.resolve(mockAirportRes));

        await handleCreateAirport(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockAirportRes
        });
    });

    it('should return a 401 if create airport failed', async () => {
        const mockReq = {
            body: {
                name: mockAirport.name,
                city: mockAirport.city,
                city_code: mockAirport.city_code,
                country: mockAirport.country,
            }
        }

        airportService.create = jest.fn().mockReturnValue(Promise.reject(err));

        await handleCreateAirport(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    });
});

describe('handleUpdateAirport', () => {
    it('should return status 201 and updates an existing airport success', async () => {
        const mockReq = {
            body: {
                type: mockAirport.name
            },
            params: {
                id: mockAirport.id
            }
        }

        airportService.update = jest.fn(() => Promise.resolve(mockAirportRes));

        await handleUpdateAirport(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockAirportRes
        });
    });

    it('should return a 401 if update airport failed', async () => {
        const mockReq = {
            body: {
                type: mockAirport.name
            },
            params: {
                id: mockAirport.id
            }
        }

        airportService.update = jest.fn().mockRejectedValue(err);

        await handleUpdateAirport(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            messange: err.message
        });
    })
});

describe('handleGetAllAirport', () => {
    it('should returns a list of all airport', async () => {
        const mockReq = {};

        const mockAirportList = []

        mockAirportList.push({
            ...mockAirportRes
        })

        const count = mockAirportList.length;

        airportService.getAll = jest.fn(() => Promise.resolve({data: mockAirportList, count: count}));

        await handleGetAllAirport(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockAirportList,
            count: count
        });
    });

    it('should return a 401 if get list airport failed', async () => {
        const mockReq = {};

        airportService.getAll = jest.fn().mockReturnValue(Promise.reject(err));

        await handleGetAllAirport(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleGetByPk', () => {
    it('returns a airport by its ID', async () => {
        const mockReq = {
            params: {
                id: mockAirport.id
            }
        };

        airportService.getByPk = jest.fn(() => Promise.resolve(mockAirportRes));

        await handleGetByPk(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockAirportRes
        });
    });

    it('should return a 401 if get airport by id failed', async () => {
        const mockReq = {
            params: {
                id: mockAirport.id
            }
        };

        airportService.getByPk = jest.fn().mockReturnValue(Promise.reject(err));

        await handleGetByPk(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleDeleteAirport', () => {
    it('delete a airport by its ID', async () => {
        const mockReq = {
            params: {
                id: mockAirport.id
            }
        };

        airportService.destory = jest.fn().mockReturnThis()

        await handleDeleteAirport(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            message: "Airport successfully deleted"
        });
    });
    it('should return a 401 if request failed', async () => {
        const mockReq = {
            params: {
                id: mockAirport.id
            }
        };

        airportService.destory = jest.fn().mockReturnValue(Promise.reject(err));

        await handleDeleteAirport(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});