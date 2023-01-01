const flightRepository = require("../../app/repositories/flightRepository");
const flightService = require("../../app/services/flightService");
const {
    create,
    destroy,
    getAll,
    getByPk,
    update
} = flightService

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

const err = new Error("eror bro");

describe('create', () => {
    it('should return data flight if create success', async() => {
        const body = mockFlight;

        flightRepository.create = jest.fn().mockResolvedValue(mockFlightRes);

        const result = await create(body);

        expect(result).toEqual(mockFlightRes);
        expect(flightRepository.create).toHaveBeenCalled();
    });
});
describe('update', () => {
    it('should return data flight if update success', async() => {
        const body = mockFlight;
        const id = mockFlight.id;

        flightRepository.update = jest.fn().mockResolvedValue(mockFlightRes);

        const result = await update(id, body);

        expect(result).toEqual(mockFlightRes);
        expect(flightRepository.update).toHaveBeenCalled();
    });
});
describe('getAll', () => {
    it('should return all flight', async () => {
        const flights = [];

        flights.push({
            ...mockFlightRes
        });

        const count = flights.length;

        flightRepository.getAll = jest.fn().mockResolvedValue(flights);
        flightRepository.getTotalCount = jest.fn().mockResolvedValue(count);

        const result = await getAll();

        expect(result).toEqual({
            data: flights,
            count: count
        });
        expect(flightRepository.getAll).toHaveBeenCalled();
    });
    it('should throw err if request failed', async () => {
        flightRepository.getAll = jest.fn().mockRejectedValue(err);

        await getAll();

        expect(err.message).toEqual(err.message);
    })
});

describe('getByPk', () => {
    it('should return data flights by id', async () => {
        const id = mockFlight.id

        flightRepository.getByPk = jest.fn().mockResolvedValue(mockFlightRes);

        const result = await getByPk(id);

        expect(result).toEqual(mockFlightRes);
        expect(flightRepository.getByPk).toHaveBeenCalled();
    });
});

describe('destroy', () => {
    it('should return if flight success delete', async () => {
        const id = mockFlight.id

        flightRepository.destroy = jest.fn().mockResolvedValue(null);

        const result = await destroy();

        expect(result).toBeNull();
        expect(flightRepository.destroy).toHaveBeenCalled();
    });
});

