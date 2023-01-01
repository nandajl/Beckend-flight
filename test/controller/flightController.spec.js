const flihtCortoller = require("../../app/controllers/api/v1/flihtCortoller");
const flightService = require("../../app/services/flightService");

const {
    handleGettAllFliht,
    handleCreateFligh,
    handleUpdateFlight,
    handleGetByPk,
    handleDeleteFlight,
} = flihtCortoller

const mockFlight = {
    id: 1,
    plane_id: 1,
    from_airport_id: 1,
    to_airport_id: 2,
    arrival_date: "2023-01-08",
    arrival_time: "23:00",
    departure_date: "2023-01-08",
    departure_time: "22:00"
};

const mockFlightRes = {
    plane_id: mockFlight.id,
    from_airport_id: mockFlight.from_airport_id,
    to_airport_id: mockFlight.to_airport_id,
    arrival_date: mockFlight.arrival_date,
    arrival_time: mockFlight.arrival_time,
    departure_date: mockFlight.departure_date,
    departure_time: mockFlight.departure_time,
    createdAt: new Date(),
    updatedAt: new Date(),
}

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};

const err = new Error("eror bro");

describe('handleGettAllFliht', () => {
    it('should returns a list of all flight', async () => {
        const mockReq = {};

        const mockFlightList = []

        mockFlightList.push({
            ...mockFlightRes
        })

        const count = mockFlightList.length;

        flightService.getAll = jest.fn(() => Promise.resolve({data: mockFlightList, count: count}));

        await handleGettAllFliht(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: {
                data: mockFlightList,
                count: count
            }
        });
    });

    it('should return a 401 if get list flight failed', async () => {
        const mockReq = {};

        flightService.getAll = jest.fn().mockReturnValue(Promise.reject(err));

        await handleGettAllFliht(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleCreateFligh', () => {
    it('should return a 201 status and creates a new flight', async () => {
        const mockReq = {
            body: {
                plane_id: mockFlight.id,
                from_airport_id: mockFlight.from_airport_id,
                to_airport_id: mockFlight.to_airport_id,
                arrival_date: mockFlight.arrival_date,
                arrival_time: mockFlight.arrival_time,
                departure_date: mockFlight.departure_date,
                departure_time: mockFlight.departure_time,
            }
        }
        
        flightService.create = jest.fn(() => Promise.resolve(mockFlightRes));

        await handleCreateFligh(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockFlightRes
        });
    });

    it('should return a 401 if create flight failed', async () => {
        const mockReq = {
            body: {
                plane_id: mockFlight.id,
                from_airport_id: mockFlight.from_airport_id,
                to_airport_id: mockFlight.to_airport_id,
                arrival_date: mockFlight.arrival_date,
                arrival_time: mockFlight.arrival_time,
                departure_date: mockFlight.departure_date,
                departure_time: mockFlight.departure_time,
            }
        }

        flightService.create = jest.fn().mockReturnValue(Promise.reject(err));

        await handleCreateFligh(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    });
});

describe('handleUpdateFlight', () => {
    it('should return status 201 and updates an existing flight success', async () => {
        const mockReq = {
            body: {
                type: mockFlight.plane_id
            },
            params: {
                id: mockFlight.id
            }
        }

        flightService.update = jest.fn(() => Promise.resolve(mockFlightRes));

        await handleUpdateFlight(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockFlightRes
        });
    });

    it('should return a 401 if update flight failed', async () => {
        const mockReq = {
            body: {
                type: mockFlight.plane_id
            },
            params: {
                id: mockFlight.id
            }
        }

        flightService.update = jest.fn().mockRejectedValue(err);

        await handleUpdateFlight(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleGetByPk', () => {
    it('returns a flight by its ID', async () => {
        const mockReq = {
            params: {
                id: mockFlight.id
            }
        };

        flightService.getByPk = jest.fn(() => Promise.resolve(mockFlightRes));

        await handleGetByPk(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockFlightRes
        });
    });

    it('should return a 401 if get flight by id failed', async () => {
        const mockReq = {
            params: {
                id: mockFlight.id
            }
        };

        flightService.getByPk = jest.fn().mockReturnValue(Promise.reject(err));

        await handleGetByPk(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleDeleteFlight', () => {
    it('delete a flight by its ID', async () => {
        const mockReq = {
            params: {
                id: mockFlight.id
            }
        };

        flightService.delete = jest.fn().mockReturnThis()

        await handleDeleteFlight(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            message: "Flight successfully deleted"
        });
    });
    it('should return a 401 if request failed', async () => {
        const mockReq = {
            params: {
                id: mockFlight.id
            }
        };

        flightService.delete = jest.fn().mockReturnValue(Promise.reject(err));

        await handleDeleteFlight(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});