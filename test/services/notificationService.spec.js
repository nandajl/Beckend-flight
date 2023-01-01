const notificationRepository = require("../../app/repositories/notificationRepository");
const notificationService = require("../../app/services/notificationService");
const {
    create,
    findNotification,
    getNotification,
    update
} = notificationService

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
}

const err = new Error('error bro')

describe('create', () => {
    it('should return data notification if create success', async() => {
        const body = mockNotif;

        notificationRepository.create = jest.fn().mockResolvedValue(mockNotifRes);

        const result = await create(body);

        expect(result).toEqual(mockNotifRes);
        expect(notificationRepository.create).toHaveBeenCalled();
    });
});

describe('update', () => {
    it('should return data notification if update success', async() => {
        const body = mockNotif;
        const id = mockNotif.id;

        notificationRepository.update = jest.fn().mockResolvedValue(mockNotifRes);

        const result = await update(id, body);

        expect(result).toEqual(mockNotifRes);
        expect(notificationRepository.update).toHaveBeenCalled();
    });
});

describe('getNotification', () => {
    it('should return data notifications by id', async () => {
        const id = mockNotif.id

        notificationRepository.getNotification = jest.fn().mockResolvedValue(mockNotifRes);

        const result = await getNotification(id);

        expect(result).toEqual(mockNotifRes);
        expect(notificationRepository.getNotification).toHaveBeenCalled();
    });
});
describe('findNotification', () => {
    it('should return data notifications by user id', async () => {
        const id = mockNotif.user_id

        const mockNotifResponseList = []

        mockNotifResponseList.push({
            ...mockNotifRes
        })

        const count = mockNotifResponseList.length

        notificationRepository.findUserNotification = jest.fn().mockResolvedValue(mockNotifResponseList);
        notificationRepository.getTotalCount = jest.fn().mockResolvedValue(count);

        const result = await findNotification(id);

        expect(result).toEqual({
            data: mockNotifResponseList,
            count: count
        });
        expect(notificationRepository.findUserNotification).toHaveBeenCalled();
    });
    it('should return err if request failed', async () => {
        const id = mockNotif.user_id

        const mockNotifResponseList = []

        mockNotifResponseList.push({
            ...mockNotifRes
        })

        const count = mockNotifResponseList.length

        notificationRepository.findUserNotification = jest.fn().mockRejectedValue(err);
        notificationRepository.getTotalCount = jest.fn().mockResolvedValue(count);

        const result = await findNotification(id);

        expect(err.message).toEqual(err.message);
        expect(notificationRepository.findUserNotification).toHaveBeenCalled();
    });

});