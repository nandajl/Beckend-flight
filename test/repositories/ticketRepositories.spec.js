const ticketRepository = require("../../app/repositories/ticketRepository");
const { Ticket } = require('../../app/models')
const {
    create,
    destroy,
    getAllTicket,
    getTicket,
    getTotalCount,
    update
} = ticketRepository

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

describe('create', () => {
    it('should return data ticket if create success', async() => {
        const body = mockTicket;
        Ticket.create = jest.fn().mockResolvedValue(mockTicketRes)

        const result = await create(body);

        expect(result).toEqual(mockTicketRes);
    });
}); 

describe('update', () => {
    it('should return data ticket if update success', async() => {
        const body = mockTicket;
        const id = mockTicket.id;
        Ticket.update = jest.fn().mockResolvedValue(mockTicketRes)

        const result = await update(id, body);

        expect(result).toEqual(mockTicketRes);
    });
});

describe('getAllTicket', () => {
    it('should return all data ticket if request success', async() => {
        const mockTicketList = [];

        mockTicketList.push({
            ...mockTicketRes
        });

        Ticket.findAll = jest.fn().mockResolvedValue(mockTicketList)

        const result = await getAllTicket();

        expect(result).toEqual(mockTicketList);
    });
});

describe('getTotalCount', () => {
    it('should return count data ticket if request success', async() => {
        const mockTicketList = [];

        mockTicketList.push({
            ...mockTicketRes
        });

        const count = mockTicketList.length;

        Ticket.count = jest.fn().mockResolvedValue(count)

        const result = await getTotalCount();

        expect(result).toEqual(count);
    });
});

describe('getTicket', () => {
    it('should return data ticket by id if request success', async() => {
        const id = mockTicket.id
        Ticket.findByPk = jest.fn().mockResolvedValue(mockTicket)

        const result = await getTicket();

        expect(result).toEqual(mockTicket);
    });
});

describe('destroy', () => {
    it('should return if delete success', async() => {
        const id = mockTicket.id
        Ticket.destroy = jest.fn().mockResolvedValue(1)

        const result = await destroy();

        expect(result).toEqual(1);
    });
}); 