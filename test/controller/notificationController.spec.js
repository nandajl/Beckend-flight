const notificatoinController = require('../../app/controllers/api/v1/notificationController');
const notificationService = require('../../app/services/notificationService');
const {
    handleUpdateNotification,
    handleFindNotification
} = notificatoinController

const mockNotif = {
    id: 1,
    transaction_id: 1,
    user_id: 2,
    message: "iki notif",
    isRead: false
};

const mockNotifResponse = {
    id: mockNotif.id,
    transaction_id: mockNotif.transaction_id,
    user_id: mockNotif.user_id,
    message: mockNotif.message,
    isRead: mockNotif.isRead,
    createdAt: new Date(),
    updatedAt: new Date()
}

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};

const err = new Error('error bro')

describe('handleUpdateNotification', () => {
    it('should return 201 status with data update if update success', async() => {
        const mockReq = {
            params: {
                id: mockNotif.id
            }
        };

        notificationService.update = jest.fn(() => Promise.resolve(mockNotifResponse));

        await handleUpdateNotification(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockNotifResponse
        });
    });

    it('should return 401 and error message if request failed', async() => {
        const mockReq = {
            params: {
                id: mockNotif.id
            }
        };

        notificationService.update = jest.fn(() => Promise.reject(err));

        await handleUpdateNotification(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('handleFindNotification', () => {
    it('should return 201 status with data notif if find success', async() => {
        const mockReq = {
            params: {
                id: mockNotif.id
            }
        };

        const mockNotifResponseList = []

        mockNotifResponseList.push({
            ...mockNotifResponse
        })

        const count = mockNotifResponseList.length

        notificationService.findNotification = jest.fn(() => Promise.resolve({data: mockNotifResponseList, count: count}));

        await handleFindNotification(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockNotifResponseList,
            count: count
        });
    })

    it('should return 401 and error message if request failed', async() => {
        const mockReq = {
            params: {
                id: mockNotif.id
            }
        };

        notificationService.findNotification = jest.fn(() => Promise.reject(err));

        await handleFindNotification(mockReq, mockRes)

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
})