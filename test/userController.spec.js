const userController = require("../app/controllers/api/v1/userController");
const authService = require("../app/services/authService");
const userService = require("../app/services/userService");
const {
    update,
    list,
    show,
    destroy
} = userController

const { encryptPassword } = authService;

const mockUser = {
    id: 1,
    username: "buyer",
    email: "buyer@mail.com",
    password: "12345",
    role: "buyer",
    firstName: "buyer",
    lastName: "cuy",
    address: null,
    photo: null,
    phone: null,
    imgVisa: null,
    imgPassport: null,
    imgResidentPermit: null
}

const mockUserResponse = {
    id: mockUser.id,
    username: mockUser.username,
    email: mockUser.email,
    password: encryptPassword(mockUser.password),
    role: mockUser.role,
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    address: null,
    photo: null,
    phone: null,
    imgVisa: null,
    imgPassport: null,
    imgResidentPermit: null,
    createdAt: new Date(),
    updateddAt: new Date(),
}

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
};

describe('update', () => {
    it('should return status 201 and update user success', async () => {
        const mockReq = {
            body : {
                username: mockUser.username 
            },
            params: {
                id: mockUser.id
            }
        };

        userService.update = jest.fn(() => Promise.resolve(mockUserResponse));

        await update(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockReq.body
        });
    });

    it('should return status 400 if update user failed', async () => {
        const mockReq = {
            body : {
                username: mockUser.username 
            },
            params: {
                id: mockUser.id
            }
        };

        const err = new Error("error bro")

        userService.update = jest.fn().mockRejectedValue(err);

        await update(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })
});

describe('list', () => {
    it('should return status 201 with data list user', async () => {
        const mockReq = {}

        const mockUserList = []

        mockUserList.push({
            ...mockUserResponse
        })

        const count = mockUserList.length

        userService.list = jest.fn(() => Promise.resolve({data: mockUserList, count: count}));

        await list(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: {users: mockUserList},
            total: {total: count}
        });
    });
    it('should return a 400 status and an error message if the request fails', async () => {
        userService.list = jest.fn(() => Promise.reject(new Error('Error bro')));
    
        await userController.list({}, mockRes)
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: 'Error bro',
        });
      });
});

describe('show', () => {
    it('should return status 200 with data user by id', async () => {
        const mockReq = {
            params: {
                id: mockUser.id
            }
        };

        userService.get =  jest.fn(() => Promise.resolve(mockUserResponse));

        await userController.show(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockUserResponse
        });
    });

    it('should return status 400 and error message if request failed', async () => {
        const mockReq = {
            params: {
                id: mockUser.id
            }
        };

        userService.get =  jest.fn(() => Promise.reject(new Error("error bro")));

        await userController.show(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: "error bro"
        });
    })
})

describe('destroy', () => {
    it('should return 201 if delete a user by ID success', async () => {
        const mockReq = {
            params: {
                id: mockUser.id
            }
        };

        userService.delete = jest.fn().mockReturnThis()

        await destroy(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
    });
})