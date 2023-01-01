const airportRepository = require("../../app/repositories/airportRepository");
const airportService = require("../../app/services/airportService");

const {
    create,
    update,
    getAll,
    getByPk,
    destroy
} = airportService;

const mockAirport = {
    id: 1,
    name: 'Kertajati',
    city: 'Majalengka',
    city_code: 'MJK',
    country: 'Indonesia'
}

const mockAirportRes = {
    id: mockAirport.id,
    name: mockAirport.name,
    city: mockAirport.city,
    city_code: mockAirport.city_code,
    country: mockAirport.country,
    createdAt: new Date(),
    updatedAt: new Date(),
}

const err = new Error("eror bro");

describe('create', () => {
    it('should return data airport if create success', async() => {
        const body = mockAirport;

        airportRepository.create = jest.fn().mockResolvedValue(mockAirportRes);

        const result = await create(body);

        expect(result).toEqual(mockAirportRes);
        expect(airportRepository.create).toHaveBeenCalled();
    });
});

describe('update', () => {
    it('should return data airport if update without image success', async() => {
        const body = mockAirport;
        const id = mockAirport.id;

        airportRepository.update = jest.fn().mockResolvedValue(mockAirportRes);

        const result = await update(id, body);

        expect(result).toEqual(mockAirportRes);
        expect(airportRepository.update).toHaveBeenCalled();
    });
});

describe('getAll', () => {
    it('should return all airport', async () => {
        const airports = [];

        airports.push({
            ...mockAirportRes
        });

        const count = airports.length;

        airportRepository.getAll = jest.fn().mockResolvedValue(airports);
        airportRepository.getTotalCount = jest.fn().mockResolvedValue(count);

        const result = await getAll();

        expect(result).toEqual({
            data: airports,
            count: count
        });
        expect(airportRepository.getAll).toHaveBeenCalled();
    });
    it('should throw err if request failed', async () => {
        airportRepository.getAll = jest.fn().mockRejectedValue(err);

        await getAll();

        expect(err.message).toEqual(err.message);
    })
});

describe('getByPk', () => {
    it('should return data airports by id', async () => {
        const id = mockAirport.id

        airportRepository.getByPk = jest.fn().mockResolvedValue(mockAirportRes);

        const result = await getByPk(id);

        expect(result).toEqual(mockAirportRes);
        expect(airportRepository.getByPk).toHaveBeenCalled();
    });
});

describe('destroy', () => {
    it('should return if airport success delete', async () => {
        const id = mockAirport.id

        airportRepository.destroy = jest.fn().mockResolvedValue(null);

        const result = await destroy();

        expect(result).toBeNull();
        expect(airportRepository.destroy).toHaveBeenCalled();
    });
});