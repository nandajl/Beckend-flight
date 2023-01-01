const transactionController = require("../../app/controllers/api/v1/transactionController");
const notificationService = require("../../app/services/notificationService");
const transactionService = require("../../app/services/transactionService");
const {
    handleCreateTransaction,
    handleUpdateTransaction,
    handleListTransaction,
    handleFindTransaction,
    handleGetTransaction,
    handleDeleteTransaction
} = transactionController

const mockTransaction = {
    id: 1,
    ticket_id: 2,
    user_id: 2,
    promo_id: 1,
    total: 1100000,
    createdAt: new Date(),
    updatedAt: new Date(),
};

const mockTransactionRes = {
    id: mockTransaction.id,
    ticket_id: mockTransaction.ticket_id,
    user_id: mockTransaction.user_id,
    promo_id: mockTransaction.promo_id,
    total: mockTransaction.total,
    createdAt: new Date(),
    updatedAt: new Date(),
}

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};

const err = new Error("eror bro");

describe('handleCreateTransaction', () => {
    it('should return a 201 status and creates a new transaction', async () => {
        const mockReq = {
            body: {
                ticket_id: mockTransaction.ticket_id,
                user_id: mockTransaction.user_id,
                promo_id: mockTransaction.promo_id,
                total: mockTransaction.total,
            }
        }

        const mockNotif = {
            transaction_id : mockTransaction.id,
            user_id: mockTransaction.user_id, 
            message: "Booking Success",
            isRead: false
        }
        
        notificationService.create = jest.fn(() => Promise.resolve(mockNotif));
        transactionService.create = jest.fn(() => Promise.resolve(mockTransactionRes));

        await handleCreateTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockTransactionRes
        });
    });

    it('should return a 401 if create transaction failed', async () => {
        const mockReq = {
            body: {
                flight_id: mockTransaction.flight_id,
                type: mockTransaction.type,
                price: mockTransaction.price,
                cabin_baggage: mockTransaction.cabin_baggage,
                baggage: mockTransaction.baggage,
                desc: mockTransaction.desc,
                photo: mockTransaction.photo,
            }
        }

        transactionService.create = jest.fn().mockReturnValue(Promise.reject(err));

        await handleCreateTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    });
});

describe('handleUpdateTransaction', () => {
    it('should return status 201 and updates an existing transaction success', async () => {
        const mockReq = {
            body: {
                type: mockTransaction.total
            },
            params: {
                id: mockTransaction.id
            }
        }

        transactionService.update = jest.fn(() => Promise.resolve(mockTransactionRes));

        await handleUpdateTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockReq.body
        });
    });

    it('should return a 401 if update transaction failed', async () => {
        const mockReq = {
            body: {
                type: mockTransaction.total
            },
            params: {
                id: mockTransaction.id
            }
        }

        transactionService.update = jest.fn().mockRejectedValue(err);

        await handleUpdateTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleListTransaction', () => {
    it('should returns a list of all transaction', async () => {
        const mockReq = {};

        const mockTransactionList = []

        mockTransactionList.push({
            ...mockTransactionRes
        })

        const count = mockTransactionList.length;

        transactionService.getAllTransaction = jest.fn(() => Promise.resolve({data: mockTransactionList, count: count}));

        await handleListTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockTransactionList,
            total: count
        });
    });

    it('should return a 401 if get list transaction failed', async () => {
        const mockReq = {};

        transactionService.getAllTransaction = jest.fn().mockReturnValue(Promise.reject(err));

        await handleListTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleFindTransaction', () => {
    it('finds a transaction by its user id', async () => {
        const mockReq = {
            params: {
                id: mockTransaction.user_id
            }
        };

        const mockTransactionList = []

        mockTransactionList.push({
            ...mockTransactionRes
        })

        transactionService.findTransaction = jest.fn(() => Promise.resolve(mockTransactionList));

        await handleFindTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockTransactionList
        });
    });

    it('should return a 400 if find transaction failed', async () => {
        const mockReq = {
            params: {
                id: mockTransaction.user_id
            }
        };

        transactionService.findTransaction = jest.fn().mockReturnValue(Promise.reject(err));

        await handleFindTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleGetTransaction', () => {
    it('returns a transaction by its ID', async () => {
        const mockReq = {
            params: {
                id: mockTransaction.id
            }
        };

        transactionService.getTransaction = jest.fn(() => Promise.resolve(mockTransactionRes));

        await handleGetTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockTransactionRes
        });
    });

    it('should return a 401 if get transaction by id failed', async () => {
        const mockReq = {
            params: {
                id: mockTransaction.id
            }
        };

        transactionService.getTransaction = jest.fn().mockReturnValue(Promise.reject(err));

        await handleGetTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleDeleteTransaction', () => {
    it('delete a transaction by its ID', async () => {
        const mockReq = {
            params: {
                id: mockTransaction.id
            }
        };

        transactionService.delete = jest.fn().mockReturnThis()

        await handleDeleteTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            message: "Transaction successfully deleted"
        });
    });
    it('should return a 401 if request failed', async () => {
        const mockReq = {
            params: {
                id: mockTransaction.id
            }
        };

        transactionService.delete = jest.fn().mockReturnValue(Promise.reject(err));

        await handleDeleteTransaction(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});