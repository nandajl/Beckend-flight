const notificationRepository = require("../../app/repositories/notificationRepository");
const { Notification } = require('../../app/models')

const {
    create,
    findUserNotification,
    getNotification,
    getTotalCount,
    update
} = notificationRepository;

const mockNotif = {
    id: 1,
    transaction_id: 1,
    user_id: 2,
    message: "iki notif",
    isRead: false
};

const mockNotifRes = {
    id: mockNotif.id,
    transaction_id: mockNotif.transaction_id,
    user_id: mockNotif.user_id,
    message: mockNotif.message,
    isRead: mockNotif.isRead,
    createdAt: new Date(),
    updatedAt: new Date()
};

describe('create', () => {
    it('should return data notification if create success', async() => {
        const body = mockNotif;
        Notification.create = jest.fn().mockResolvedValue(mockNotifRes)

        const result = await create(body);

        expect(result).toEqual(mockNotifRes);
    });
});

describe('update', () => {
    it('should return data notification if update success', async() => {
        const body = mockNotif;
        const id = mockNotif.id;
        Notification.update = jest.fn().mockResolvedValue(mockNotifRes)

        const result = await update(id, body);

        expect(result).toEqual(mockNotifRes);
    });
});

describe('getTotalCount', () => {
    it('should return count data notification if request success', async() => {
        const mockNotifList = [];

        mockNotifList.push({
            ...mockNotifRes
        });

        const count = mockNotifList.length;

        Notification.count = jest.fn().mockResolvedValue(count)

        const result = await getTotalCount();

        expect(result).toEqual(count);
    });
}); 

describe('getNotification', () => {
    it('should return data notification by id if request success', async() => {
        const id = mockNotif.id
        Notification.findByPk = jest.fn().mockResolvedValue(mockNotif)

        const result = await getNotification(id);

        expect(result).toEqual(mockNotif);
    });
});

describe('findUserNotification', () => {
    it('should return all data notification by user id', async () => {
        const condition = {
            user_id: mockNotif.user_id
        }
        const mockNotifList = [];

        mockNotifList.push({
            ...mockNotifRes
        });

        Notification.findAll = jest.fn().mockResolvedValue(mockNotifList)

        const result = await findUserNotification(condition);

        expect(result).toEqual(mockNotifList);
    })
})
