const ticketRepository = require("../../app/repositories/ticketRepository");
const ticketService = require("../../app/services/ticketService");
const cloudinary = require("cloudinary").v2;
const {
    create,
    destroy,
    getAllTicket,
    getTicket,
    update
} = ticketService

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

const err = new Error("eror bro")

describe('create', () => {
    it('should return data ticket if create without image success', async() => {
        const image = undefined;
        const body = mockTicket;

        ticketRepository.create = jest.fn().mockResolvedValue(mockTicketRes);

        const result = await create(body, image);

        expect(result).toEqual(mockTicketRes);
        expect(ticketRepository.create).toHaveBeenCalled();
    });

    it('should return data ticket if create with image success', async() => {
        const image = { buffer: Buffer.from('test image'), mimetype: 'image/jpeg' };;
        const body = mockTicket;

        const result = { url: 'https://test.com/image.jpg' };

        body.photo = result.url

        cloudinary.uploader.upload = jest.fn().mockResolvedValue(result);

        ticketRepository.create = jest.fn().mockResolvedValue(mockTicketRes);

        const ticket = await create(body, image);

        expect(ticket).toEqual(mockTicketRes);
        expect(ticketRepository.create).toHaveBeenCalled();
    });

    it('should throw err if request failed', async () => {
        const image = { buffer: Buffer.from('test image'), mimetype: 'image/jpeg' };;
        const body = mockTicket;

        const result = { url: 'https://test.com/image.jpg' };

        body.photo = result.url

        cloudinary.uploader.upload = jest.fn().mockRejectedValue(err);

        ticketRepository.create = jest.fn().mockResolvedValue(err);

        await create(body, image);

        expect(err.message).toEqual(err.message);
    })
    
});

describe('update', () => {
    it('should return data ticket if update without image success', async() => {
        const image = undefined;
        const body = mockTicket;
        const id = mockTicket.id;

        ticketRepository.update = jest.fn().mockResolvedValue(mockTicketRes);

        const result = await update(id, body, image);

        expect(result).toEqual(mockTicketRes);
        expect(ticketRepository.update).toHaveBeenCalled();
    });

    it('should return data ticket if update with image success', async() => {
        const image = { buffer: Buffer.from('test image'), mimetype: 'image/jpeg' };;
        const body = mockTicket;
        const id = mockTicket.id;

        const result = { url: 'https://test.com/image.jpg' };

        body.photo = result.url

        cloudinary.uploader.upload = jest.fn().mockResolvedValue(result);

        ticketRepository.update = jest.fn().mockResolvedValue(mockTicketRes);

        const ticket = await update(body, id, image);

        expect(ticket).toEqual(mockTicketRes);
        expect(ticketRepository.update).toHaveBeenCalled();
    });

    it('should throw err if request failed', async () => {
        const image = { buffer: Buffer.from('test image'), mimetype: 'image/jpeg' };;
        const body = mockTicket;
        const id = mockTicket.id;

        const result = { url: 'https://test.com/image.jpg' };

        body.photo = result.url

        cloudinary.uploader.upload = jest.fn().mockRejectedValue(err);

        ticketRepository.update = jest.fn().mockResolvedValue(err);

        await update(body, id, image);

        expect(err.message).toEqual(err.message);
    })
});

describe('getAll', () => {
    it('should return all ticket', async () => {
        const tickets = [];

        tickets.push({
            ...mockTicketRes
        });

        const count = tickets.length;

        ticketRepository.getAllTicket = jest.fn().mockResolvedValue(tickets);
        ticketRepository.getTotalCount = jest.fn().mockResolvedValue(count);

        const result = await getAllTicket();

        expect(result).toEqual({
            data: tickets,
            count: count
        });
        expect(ticketRepository.getAllTicket).toHaveBeenCalled();
    });
    it('should throw err if request failed', async () => {
        ticketRepository.getAllTicket = jest.fn().mockRejectedValue(err);

        await getAllTicket();

        expect(err.message).toEqual(err.message);
    })
});

describe('getTicket', () => {
    it('should return all tickets', async () => {
        const id = mockTicket.id

        ticketRepository.getTicket = jest.fn().mockResolvedValue(mockTicketRes);

        const result = await getTicket(id);

        expect(result).toEqual(mockTicketRes);
        expect(ticketRepository.getTicket).toHaveBeenCalled();
    });
});

describe('destroy', () => {
    it('should return all tickets', async () => {
        const id = mockTicket.id

        ticketRepository.destroy = jest.fn().mockResolvedValue(null);

        const result = await destroy(id);

        expect(result).toBeNull();
        expect(ticketRepository.destroy).toHaveBeenCalled();
    });
});