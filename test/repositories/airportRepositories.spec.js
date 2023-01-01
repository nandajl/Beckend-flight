const airportRepository = require("../../app/repositories/airportRepository");
const { Airport } = require('../../app/models')

const {
    create,
    destroy,
    getAll,
    getByPk,
    getTotalCount,
    update
} = airportRepository

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

describe('create', () => {
    it('should return data airport if create success', async() => {
        const body = mockAirport;
        Airport.create = jest.fn().mockResolvedValue(mockAirportRes)

        const result = await create(body);

        expect(result).toEqual(mockAirportRes);
    });
}); 

describe('update', () => {
    it('should return data airport if update success', async() => {
        const body = mockAirport;
        const id = mockAirport.id;
        Airport.update = jest.fn().mockResolvedValue(mockAirportRes)

        const result = await update(id, body);

        expect(result).toEqual(mockAirportRes);
    });
}); 

describe('getAll', () => {
    it('should return all data airport if request success', async() => {
        const mockAirportList = [];

        mockAirportList.push({
            ...mockAirportRes
        });

        Airport.findAll = jest.fn().mockResolvedValue(mockAirportList)

        const result = await getAll();

        expect(result).toEqual(mockAirportList);
    });
}); 

describe('getTotalCount', () => {
    it('should return count data airport if request success', async() => {
        const mockAirportList = [];

        mockAirportList.push({
            ...mockAirportRes
        });

        const count = mockAirportList.length;

        Airport.count = jest.fn().mockResolvedValue(count)

        const result = await getTotalCount();

        expect(result).toEqual(count);
    });
}); 

describe('getByPk', () => {
    it('should return data airport by id if request success', async() => {
        const id = mockAirport.id
        Airport.findByPk = jest.fn().mockResolvedValue(mockAirport)

        const result = await getByPk(id);

        expect(result).toEqual(mockAirport);
    });
}); 

describe('destroy', () => {
    it('should return if delete success', async() => {
        const id = mockAirport.id
        Airport.destroy = jest.fn().mockResolvedValue(1)

        const result = await destroy(id);

        expect(result).toEqual(1);
    });
}); 