const userRepository = require("../../app/repositories/userRepository");
const authService = require("../../app/services/authService");
const bcrypt = require('bcryptjs');

const {
    authorize,
    authorizeAdmin,
    createWebToken,
    encryptPassword,
    login,
    register,
    comparePassword,
    verifyToken
} = authService;

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
    password: bcrypt.hashSync(mockUser.password, 10),
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

const err = new Error('error bro');

const token = createWebToken({
    id: mockUser.id,
    email: mockUser.email,
    role : mockUser.role
})

describe('register', () => {
    it('should return data user if register success', async()=> {
        const {username, email, password, role} = mockUser;

        userRepository.findUser = jest.fn().mockResolvedValue(null)
        userRepository.create = jest.fn().mockResolvedValue(mockUserResponse)

        const result = await register(username, email, password, role);
        expect(result).toEqual(mockUserResponse) 
    });

    it('should return message "user alredy exist" if user alredy exist', async()=> {
        const {username, email, password, role} = mockUser;

        userRepository.findUser = jest.fn().mockResolvedValue(mockUserResponse)

        const result = await register(username, email, password, role);
        expect(result).toEqual("user alredy exist") 
    });

    it('should return err if request failed', async()=> {
        const {username, email, password, role} = mockUser;

        userRepository.findUser = jest.fn().mockRejectedValue(err)

        const result = await register(username, email, password, role);
        expect(err.message).toEqual(err.message) 
    });
});

describe('login', () => {
    it('should return data user with token if login success', async()=> {
        const {email, password} = mockUser;

        userRepository.findUser = jest.fn().mockResolvedValue(mockUserResponse)
        authService.comparePassword = jest.fn(() => Promise.resolve(true));

        authService.createWebToken = jest.fn().mockResolvedValue('my_fixed_token');

        const result = await login(email, password);
        expect(result).toEqual(expect.anything()) 
    });

    it('should return message "User not found" if User not found', async()=> {
        const {email, password} = mockUser;

        userRepository.findUser = jest.fn().mockResolvedValue(null)

        const result = await login(email, password);
        expect(result).toEqual("User not found") 
    });

    it('should return message "WRONG PASSWORD" if password not sync', async()=> {
        const {email, password} = mockUser;

        userRepository.findUser = jest.fn().mockResolvedValue(mockUserResponse)
        const comparePassword = jest.fn(() => Promise.resolve(false));

        const result = await login(email, "asda");
        expect(result).toEqual("WRONG PASSWORD") 
    });

    it('should return error if request failed', async()=> {
        const {email, password} = mockUser;

        userRepository.findUser = jest.fn().mockRejectedValue(err)

        const result = await login(email, password);
        expect(err.message).toEqual(err.message) 
    });
});

describe('authorize', () => {
    it('should return user data if authorized', async() => {
        const id = mockUser.id;
        userRepository.findUser = jest.fn().mockResolvedValue(mockUserResponse);

        const result = await authorize(token)
        expect(result).toEqual(mockUserResponse);
    });
    it('should return err if unauthorized', async() => {
        userRepository.findUser = jest.fn().mockRejectedValue(err);

        const result = await authorize(token)
        expect(err.message).toEqual(err.message);
    })
});
describe('authorizeAdmin', () => {
    it('should return false if unauthorized admin', async() => {
        const id = mockUser.id;
        userRepository.findUser = jest.fn().mockResolvedValue(mockUserResponse);

        const result = await authorizeAdmin(token)
        expect(result).toEqual(false);
    });
    it('should return data admin if authorized', async() => {
        const mockAdminResponse = {
            ...mockUserResponse,
            role: "admin"
        }
        
        userRepository.findUser = jest.fn().mockRejectedValue(mockAdminResponse);

        const token = createWebToken({
            id: mockUser.id,
            email: mockUser.email,
            role : "admin"
        })

        const result = await authorizeAdmin(token)
        expect(result).toEqual(mockAdminResponse);
    });
    it('should return err if unauthorized', async() => {
        userRepository.findUser = jest.fn().mockRejectedValue(err);

        const result = await authorizeAdmin(token)
        expect(err.message).toEqual(err.message);
    })
});

