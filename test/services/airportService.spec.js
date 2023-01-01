const airportRepository = require("../../app/repositories/airportRepository");
const airportService = require("../../app/services/airportService");

const {
    create,
    update,
    getAll,
    getByPk,
    destory
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
    it('should return data airport if update success', async() => {
        const body = {
            name: mockAirport.name
        };
        const id = mockAirport.id;

        airportRepository.update = jest.fn().mockResolvedValue(mockAirportRes);

        const result = await update(id, body);

        expect(result).toEqual(mockAirportRes);
        expect(airportRepository.update).toHaveBeenCalled();
    });
});