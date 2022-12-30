const authController = require('../app/controllers/api/v1/authController');
const { handleRegister } = authController;
const authService = require('../app/services/authService');
const {encryptPassword} = authService;

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

describe('handleRegister', () => {
  it('should return a 201 status and the registered user if registration is successful', async () => {
    // mock the authService.register function to return a resolved promise with a user object
    authService.register = jest.fn(() => Promise.resolve(mockUserResponse));

    const mockReq = {
        body: {
            username: mockUser.username,
            email : mockUser.email,
            password : mockUser.password
        }
    }

    // call the handleRegister function with the mock request and response objects
    await handleRegister(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
        status: 'OK',
        data: mockUserResponse,
    });
  });

  it('should return a 401 status and a message if the email is already registered', async () => {
    // mock the authService.register function to return a rejected promise with an error object
    authService.register = jest.fn().mockReturnValue(false);

    const mockReq = {
        body: {
            username: mockUser.username,
            email : mockUser.email,
            password : mockUser.password
        }
    }

    // call the handleRegister function with the mock request and response objects
    await handleRegister(mockReq, mockRes)
    
    // assert that the response status and message are correct
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
        status: 'FAIL',
        message: `User with email ${mockUser.email} already exist, please login`,
    });
  });
});