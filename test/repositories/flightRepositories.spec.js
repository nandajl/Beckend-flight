const flightRepository = require("../../app/repositories/flightRepository");
const {Flight} = require('../../app/models')
const {
    create,
    destroy,
    getAll,
    getByPk,
    getTotalCount,
    update
} = flightRepository

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

describe('create', () => {
    it('should return data flight if create success', async() => {
        const body = mockFlight;
        Flight.create = jest.fn().mockResolvedValue(mockFlightRes)

        const result = await create(body);

        expect(result).toEqual(mockFlightRes);
    });
}); 
describe('update', () => {
    it('should return data flight if update success', async() => {
        const body = mockFlight;
        const id = mockFlight.id;
        Flight.update = jest.fn().mockResolvedValue(mockFlightRes)

        const result = await update(id, body);

        expect(result).toEqual(mockFlightRes);
    });
}); 
describe('getAll', () => {
    it('should return all data flight if request success', async() => {
        const mockFlightList = [];

        mockFlightList.push({
            ...mockFlightRes
        });

        Flight.findAll = jest.fn().mockResolvedValue(mockFlightList)

        const result = await getAll();

        expect(result).toEqual(mockFlightList);
    });
}); 

describe('getTotalCount', () => {
    it('should return count data flight if request success', async() => {
        const mockFlightList = [];

        mockFlightList.push({
            ...mockFlightRes
        });

        const count = mockFlightList.length;

        Flight.count = jest.fn().mockResolvedValue(count)

        const result = await getTotalCount();

        expect(result).toEqual(count);
    });
}); 

describe('getByPk', () => {
    it('should return data flight by id if request success', async() => {
        const id = mockFlight.id
        Flight.findByPk = jest.fn().mockResolvedValue(mockFlight)

        const result = await getByPk();

        expect(result).toEqual(mockFlight);
    });
}); 
describe('destroy', () => {
    it('should return if delete success', async() => {
        const id = mockFlight.id
        Flight.destroy = jest.fn().mockResolvedValue(1)

        const result = await destroy();

        expect(result).toEqual(1);
    });
}); 