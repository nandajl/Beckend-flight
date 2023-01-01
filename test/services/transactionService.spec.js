const transactionRepository = require("../../app/repositories/transactionRepository");
const transactionService = require("../../app/services/transactionService");

const {
    create,
    destroy,
    findTransaction,
    getAllTransaction,
    getTransaction,
    update
} = transactionService;

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

const err = new Error("eror bro");

describe('create', () => {
    it('should return data transaction if create success', async() => {
        const body = mockTransaction;

        transactionRepository.create = jest.fn().mockResolvedValue(mockTransactionRes);

        const result = await create(body);

        expect(result).toEqual(mockTransactionRes);
        expect(transactionRepository.create).toHaveBeenCalled();
    });
});

describe('update', () => {
    it('should return data transaction if update success', async() => {
        const body = mockTransaction;
        const id = mockTransaction.id;

        transactionRepository.update = jest.fn().mockResolvedValue(mockTransactionRes);

        const result = await update(id, body);

        expect(result).toEqual(mockTransactionRes);
        expect(transactionRepository.update).toHaveBeenCalled();
    });
});

describe('getAllTransaction', () => {
    it('should return all transaction', async () => {
        const transactions = [];

        transactions.push({
            ...mockTransactionRes
        });

        const count = transactions.length;

        transactionRepository.getAllTransactions = jest.fn().mockResolvedValue(transactions);
        transactionRepository.getTotalCount = jest.fn().mockResolvedValue(count);

        const result = await getAllTransaction();

        expect(result).toEqual({
            data: transactions,
            count: count
        });
        expect(transactionRepository.getAllTransactions).toHaveBeenCalled();
    });
    it('should throw err if request failed', async () => {
        transactionRepository.getAllTransactions = jest.fn().mockRejectedValue(err);

        await getAllTransaction();

        expect(err.message).toEqual(err.message);
    })
});

describe('getTransaction', () => {
    it('should return data transactions by id', async () => {
        const id = mockTransaction.id

        transactionRepository.getTransaction = jest.fn().mockResolvedValue(mockTransactionRes);

        const result = await getTransaction(id);

        expect(result).toEqual(mockTransactionRes);
        expect(transactionRepository.getTransaction).toHaveBeenCalled();
    });
});

describe('destroy', () => {
    it('should return if transaction success delete', async () => {
        const id = mockTransaction.id

        transactionRepository.destroy = jest.fn().mockResolvedValue(null);

        const result = await destroy(id);

        expect(result).toBeNull();
        expect(transactionRepository.destroy).toHaveBeenCalled();
    });
});

describe('findTransaction', () => {
    it('should return data transactions by user id', async () => {
        const id = mockTransaction.user_id

        transactionRepository.findUserTransaction = jest.fn().mockResolvedValue(mockTransactionRes);

        const result = await findTransaction(id);

        expect(result).toEqual(mockTransactionRes);
        expect(transactionRepository.findUserTransaction).toHaveBeenCalled();
    });
});