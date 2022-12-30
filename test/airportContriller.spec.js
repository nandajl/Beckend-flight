'use strict';
const AirportController = require('../app/controllers/api/v1/airportController')
const {Airport} = require('../app/models')
const AirportService = require('../app/services/airportService')

jest.mock('../app/models')

describe('airportControler get all', () => {
    afterEach(jest.clearAllMocks);
    it('#should call res.status(200) and res json with list of airport', async () => {
      const Airport_data = {
        name: 'Kerta',
        city: 'Majalengka',
        country: 'Indonesia'
      }

      Airport.findAll.mockResolvedValue(Airport_data)
      Airport.count.mockResolvedValue(1)
  
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
  
      const { data, count } = await AirportService.getAll();

      const mockReq = {};
      const airportRes = {
        status: 'OK',
        data: data,
        count: count,
      };
  
      await AirportController.handleGetAllAirport(mockReq, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'OK',
        data: data,
        count: count,
      });
    });
    it('sould call res.status(400) and res.json with airport', async () =>{
        const err = new Error("err")

        const mockRes = {
            status : jest.fn().mockReturnThis(),
            json : jest.fn().mockReturnThis()
        }
        const mockReq = {}

        // mockModel
        Airport.findAll.mockReturnValue(Promise.reject(err))

        await AirportController.handleGetAllAirport(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        })
    })

  });

describe('create airport', () => {
it('#sould call res.status(201) and res.json with data of aiport', async () => {
        const mockReq = {
            body: {
                name: 'Kerta Jatati',
                city: 'Majalengka',
                country: 'Indonesia'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

        // mockModel
        Airport.create.mockReturnValue(mockReq.body)


        await AirportController.handleCreateAirport(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(201)
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockReq.body
        })
    })

    it('#sould call res.status(201) end res.json with err.message', async () => {
        const err = new Error('err')
        const mockReq = {
            body: {
                name: 'Kerta Jatati',
                city: 'Majalengka',
                country: 'Indonesia'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

         // mockModel
         Airport.create.mockReturnValue(Promise.reject(err))


         await AirportController.handleCreateAirport(mockReq, mockRes)
 
         expect(mockRes.status).toHaveBeenCalledWith(400)
         expect(mockRes.json).toHaveBeenCalledWith({
             status: 'FAIL',
             message: err.message
         })
    })
})

describe('handleUpdateAiport', () => {
    it('#sould call res.status(201) end json with success status', async () =>{
        const mockReq = {
            params:{
                id: '1'
            },
            body:{
                id:'1',
                name: 'Kerta Jatati',
                city: 'Majalengka',
                country: 'Indonesia'
            }
        }

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

        // mockModel
        AirportService.update = jest.fn(() => Promise.resolve(mockReq.body));

        await AirportController.handleUpdateAirport(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(201)
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockReq.body
        })
    })
    it('#sould call res.status(400) end json with success FAIL', async () =>{
        const mockReq = {
            params:{
                id: '1'
            },
            body:{
                id:'1',
                name: 'Kerta Jatati',
                city: 'Majalengka',
                country: 'Indonesia'
            }
        }

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
        const err = new Error('err')
        // mockModel
        AirportService.update = jest.fn(() => Promise.reject(err));

        await AirportController.handleUpdateAirport(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            messange: err.message
        })
    })
})

describe('getBtPk', () =>{
    it('#sould call res.status(201) and res.json with data of aiport', async () =>{
        const mockReq = {
            params:{
                id: '1'
            },
            body:{
                id:'1',
                name: 'Kerta Jatati',
                city: 'Majalengka',
                country: 'Indonesia'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

        // mockModel
        AirportService.getByPk = jest.fn(() => Promise.resolve(mockReq.body))

        await AirportController.handleGetByPk(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(201)
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockReq.body
        })
    })
    it('#sould call res.status(201) and res.json with data of aiport', async () =>{
        const mockReq = {
            params:{
                id: '1'
            },
            body:{
                id:'1',
                name: 'Kerta Jatati',
                city: 'Majalengka',
                country: 'Indonesia'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
        const err = new Error('err')

        // mockModel
        AirportService.getByPk = jest.fn(() => Promise.reject(err))

        await AirportController.handleGetByPk(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        })
    })
})

describe('HandleDeleteAiport', () => {
    it('#sould call res.status(200) and res.json with OK', async () =>{
        const mockReq = {
            params:{
                id:1
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

        // mockModel
        AirportService.delete = jest.fn().mockReturnThis()

        await AirportController.handleDeleteAirport(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(201)
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            message: 'Airport successfully deleted'
        })
    })
    it('#sould call res.status(400) and res.json with status FAIL', async () =>{
        const mockReq = {
            params:{
                id:1
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

        // mockModel
        const err = new Error('err')
        AirportService.delete = jest.fn( () => Promise.reject(err))

        await AirportController.handleDeleteAirport(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(400)
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        })
    })
})