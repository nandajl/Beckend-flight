const ticketController = require("../../app/controllers/api/v1/ticketController");
const ticketService = require("../../app/services/ticketService");
const {
    handleCreateTicket,
    handleUpdateTicket,
    handleListTicket,
    handleGetTicket,
    handleDeleteTicket
} = ticketController

const mockTicket = {
    id: 1,
    flight_id: 1,
    type: "Economi",
    price: 700000,
    cabin_baggage: "7 KG",
    baggage: "20 KG",
    desc: "iki tiket",
    photo: "cis"
}

const mockTicketRes = {
    id: mockTicket.id,
    flight_id: mockTicket.flight_id,
    type: mockTicket.type,
    price: mockTicket.price,
    cabin_baggage: mockTicket.cabin_baggage,
    baggage: mockTicket.baggage,
    desc: mockTicket.desc,
    photo: mockTicket.photo,
    createdAt: new Date(),
    updatedAt: new Date(),
}

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};

const err = new Error("eror bro")

describe('handleCreateTicket', () => {
    it('should return a 201 status and creates a new ticket', async () => {
        const mockReq = {
            body: {
                flight_id: mockTicket.flight_id,
                type: mockTicket.type,
                price: mockTicket.price,
                cabin_baggage: mockTicket.cabin_baggage,
                baggage: mockTicket.baggage,
                desc: mockTicket.desc,
                photo: mockTicket.photo,
            }
        }

        ticketService.create = jest.fn(() => Promise.resolve(mockTicketRes));

        await handleCreateTicket(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockTicketRes
        });
    });

    it('should return a 401 if create ticket failed', async () => {
        const mockReq = {
            body: {
                flight_id: mockTicket.flight_id,
                type: mockTicket.type,
                price: mockTicket.price,
                cabin_baggage: mockTicket.cabin_baggage,
                baggage: mockTicket.baggage,
                desc: mockTicket.desc,
                photo: mockTicket.photo,
            }
        }

        ticketService.create = jest.fn().mockReturnValue(Promise.reject(err));

        await handleCreateTicket(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    });
});

describe('handleUpdateTicket', () => {
    it('should return status 201 and updates an existing ticket success', async () => {
        const mockReq = {
            body: {
                type: mockTicket.type
            },
            params: {
                id: mockTicket.id
            }
        }

        ticketService.update = jest.fn(() => Promise.resolve(mockTicketRes));

        await handleUpdateTicket(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockReq.body
        });
    });

    it('should return a 401 if update ticket failed', async () => {
        const mockReq = {
            body: {
                type: mockTicket.type
            },
            params: {
                id: mockTicket.id
            }
        }

        ticketService.update = jest.fn().mockRejectedValue(err);

        await handleUpdateTicket(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleListTicket', () => {
    it('should returns a list of all ticket', async () => {
        const mockReq = {};

        const mockTicketList = []

        mockTicketList.push({
            ...mockTicketRes
        })

        const count = mockTicketList.length;

        ticketService.getAllTicket = jest.fn(() => Promise.resolve({data: mockTicketList, count: count}));

        await handleListTicket(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockTicketList,
            total: count
        });
    });

    it('should return a 401 if get list ticket failed', async () => {
        const mockReq = {};

        ticketService.getAllTicket = jest.fn().mockReturnValue(Promise.reject(err));

        await handleListTicket(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleGetTicket', () => {
    it('returns a ticket by its ID', async () => {
        const mockReq = {
            params: {
                id: mockTicket.id
            }
        };

        ticketService.getTicket = jest.fn(() => Promise.resolve(mockTicketRes));

        await handleGetTicket(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockTicketRes
        });
    });

    it('should return a 401 if get ticket by id failed', async () => {
        const mockReq = {
            params: {
                id: mockTicket.id
            }
        };

        ticketService.getTicket = jest.fn().mockReturnValue(Promise.reject(err));

        await handleGetTicket(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleDeleteTicket', () => {
    it('delete a ticket by its ID', async () => {
        const mockReq = {
            params: {
                id: mockTicket.id
            }
        };

        ticketService.destroy = jest.fn().mockReturnThis()

        await handleDeleteTicket(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            message: "Ticket successfully deleted"
        });
    });
    it('should return a 401 if request failed', async () => {
        const mockReq = {
            params: {
                id: mockTicket.id
            }
        };

        ticketService.destroy = jest.fn().mockReturnValue(Promise.reject(err));

        await handleDeleteTicket(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});