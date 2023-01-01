const transactionRepository = require("../../app/repositories/transactionRepository");
const { Transaction } = require('../../app/models')

const {
    create,
    destroy,
    findUserTransaction,
    getAllTransactions,
    getTotalCount,
    getTransaction,
    update
} = transactionRepository;

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

describe('create', () => {
    it('should return data transaction if create success', async() => {
        const body = mockTransaction;
        Transaction.create = jest.fn().mockResolvedValue(mockTransactionRes)

        const result = await create(body);

        expect(result).toEqual(mockTransactionRes);
    });
}); 

describe('update', () => {
    it('should return data transaction if update success', async() => {
        const body = mockTransaction;
        const id = mockTransaction.id;
        Transaction.update = jest.fn().mockResolvedValue(mockTransactionRes)

        const result = await update(id, body);

        expect(result).toEqual(mockTransactionRes);
    });
});

describe('getAllTransactions', () => {
    it('should return all data transaction if request success', async() => {
        const mockTransactionList = [];

        mockTransactionList.push({
            ...mockTransactionRes
        });

        Transaction.findAll = jest.fn().mockResolvedValue(mockTransactionList)

        const result = await getAllTransactions();

        expect(result).toEqual(mockTransactionList);
    });
});

describe('getTotalCount', () => {
    it('should return count data transaction if request success', async() => {
        const mockTransactionList = [];

        mockTransactionList.push({
            ...mockTransactionRes
        });

        const count = mockTransactionList.length;

        Transaction.count = jest.fn().mockResolvedValue(count)

        const result = await getTotalCount();

        expect(result).toEqual(count);
    });
});

describe('getTransaction', () => {
    it('should return data transaction by id if request success', async() => {
        const id = mockTransaction.id
        Transaction.findByPk = jest.fn().mockResolvedValue(mockTransaction)

        const result = await getTransaction();

        expect(result).toEqual(mockTransaction);
    });
});

describe('destroy', () => {
    it('should return if delete success', async() => {
        const id = mockTransaction.id
        Transaction.destroy = jest.fn().mockResolvedValue(1)

        const result = await destroy();

        expect(result).toEqual(1);
    });
});

describe('findUserTransaction', () => {
    it('should return all data transaction by user id', async () => {
        const condition = {
            user_id: mockTransaction.user_id
        }
        const mockTransactionList = [];

        mockTransactionList.push({
            ...mockTransactionRes
        });

        Transaction.findAll = jest.fn().mockResolvedValue(mockTransactionList)

        const result = await findUserTransaction(condition);

        expect(result).toEqual(mockTransactionList);
    })
})