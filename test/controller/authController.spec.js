const authController = require('../../app/controllers/api/v1/authController');
const { 
    handleRegister,
    handleLogin,
    authorize,
    authorizeAdmin,
    whoAmI
} = authController;
const authService = require('../../app/services/authService');
const {encryptPassword, createWebToken, verifyToken} = authService;

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

const err = new Error('error bro');

const token = createWebToken({
    id: mockUser.id,
    email: mockUser.email,
    role : mockUser.role
})



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

  it('should return a 401 status and message if register failed', async () => {
        const mockReq = {
            body: {
                username: mockUser.username,
                email : mockUser.email,
                password : mockUser.password
            }
        }

        authService.register = jest.fn(() => Promise.reject(err));

        // call the handleRegister function with the mock request and response objects
        await handleRegister(mockReq, mockRes)
        
        // assert that the response status and message are correct
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'FAIL',
            message: err.message
        });
    })

});

describe('handleLogin', () => {
  it('should return 201 if user success login', async () => {
      const mockReq = {
          body: {
              email: mockUser.email,
              password: mockUser.password
          }
      }

      authService.login = jest.fn(()=> Promise.resolve(mockUserResponse));

      await handleLogin(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
          status: "OK",
          data: mockUserResponse
      })
  });

  it('should return a 401 status and a message not authenticate', async () => {
    // mock the authService.register function to return a rejected promise with an error object
    
    const mockReq = {
        body: {
            email : mockUser.email,
            password : mockUser.password
        }
    }

    authService.login = jest.fn().mockReturnValue(false);

    // call the handleRegister function with the mock request and response objects
    await handleLogin(mockReq, mockRes)
    
    // assert that the response status and message are correct
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
        status: 'FAIL',
        message: `Email or password is not identified`,
    });

  });

  it('should return a 401 status and message if login failed', async () => {
    const mockReq = {
        body: {
            email : mockUser.email,
            password : mockUser.password
        }
    }

    authService.login = jest.fn(() => Promise.reject(err));

    // call the handleRegister function with the mock request and response objects
    await handleLogin(mockReq, mockRes)
    
    // assert that the response status and message are correct
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
        status: 'FAIL',
        message: err.message
    });
    });
})

describe('authorize', () => {
    it('should call next function if authorize', async() => {
        const mockReq = {
            headers: {
                authorization : `Bearer ${token}`
            }
        }

        const mockNext = jest.fn()

        authService.authorize = jest.fn(() => Promise.resolve(mockUserResponse))

        await authorize(mockReq, {}, mockNext)

        expect(mockNext).toBeCalled()
    });

    it('should return 403 status if headers authorization missing', async() => {
        const mockReq = {
            headers: {}
        }

        const mockNext = jest.fn()

        await authorize(mockReq, mockRes, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "WRONG BEARER TOKEN",
        });
    });

    it('should return 403 status if user unauthorized', async() => {
        const mockReq = {
            headers: {
                authorization : `Bearer ${token}`
            }
        }

        const mockNext = jest.fn()

        authService.authorize = jest.fn().mockReturnValue(false)

        await authorize(mockReq, mockRes, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "UNAUTHORIZED",
        });
    });

    it('should return 400 status with message if request failed', async () =>{
        const mockReq = {
            headers: {
                authorization : `Bearer ${token}`
            }
        }

        const mockNext = jest.fn()

        authService.authorize = jest.fn(() => Promise.reject(err));

        await authorize(mockReq, mockRes, mockNext)
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "NEED AUTHORIZATION",
        });
    });
});

describe('authorizeAdmin', () => {
    it('should call next function if authorize', async() => {
        const mockReq = {
            headers: {
                authorization : `Bearer ${token}`
            }
        }

        const mockNext = jest.fn()

        authService.authorizeAdmin = jest.fn(() => Promise.resolve(mockUserResponse))

        await authorizeAdmin(mockReq, {}, mockNext)

        expect(mockNext).toBeCalled()
    });

    it('should return 403 status if headers authorization missing', async() => {
        const mockReq = {
            headers: {}
        }

        const mockNext = jest.fn()

        await authorizeAdmin(mockReq, mockRes, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "WRONG BEARER TOKEN",
        });
    });

    it('should return 403 status if admin unauthorized', async() => {
        const mockReq = {
            headers: {
                authorization : `Bearer ${token}`
            }
        }

        const mockNext = jest.fn()

        authService.authorizeAdmin = jest.fn().mockReturnValue(false)

        await authorizeAdmin(mockReq, mockRes, mockNext)

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Your not an admin",
        });
    });

    it('should return 400 status with message if request failed', async () =>{
        const mockReq = {
            headers: {
                authorization : `Bearer ${token}`
            }
        }

        const mockNext = jest.fn()

        authService.authorizeAdmin = jest.fn(() => Promise.reject(new Error('err')));

        await authorizeAdmin(mockReq, mockRes, mockNext)
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "NEED AUTHORIZATION",
        });
    });
});

describe('whoAmI', () => {
    it('should return 201 status with data user if request success', () => {
        const mockReq = {
            user: mockUserResponse
        };

        whoAmI(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockUserResponse,
        });
    });
})