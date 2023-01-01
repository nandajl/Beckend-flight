const userRepository = require("../../app/repositories/userRepository");
const authService = require("../../app/services/authService");
const userService = require("../../app/services/userService");
const cloudinary = require("cloudinary").v2

const {
    create,
    destroy,
    get,
    list,
    update
} = userService

const {encryptPassword} = authService

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

const mockUserRes = {
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

const err = new Error('error bro');

describe('update', () => {
    it('should return data user if update without image success', async() => {
        const image = undefined;
        const body = mockUser;
        const id = mockUser.id

        userRepository.update = jest.fn().mockResolvedValue(mockUserRes);

        const result = await update(id, body, image);

        expect(result).toEqual(mockUserRes);
        expect(userRepository.update).toHaveBeenCalled();
    });

    it('should return data user if update with image success', async() => {
        const image = { buffer: Buffer.from('test image'), mimetype: 'image/jpeg' };;
        const body = mockUser;
        const id = mockUser.id


        const result = { url: 'https://test.com/image.jpg' };

        body.photo = result.url

        cloudinary.uploader.upload = jest.fn().mockResolvedValue(result);

        userRepository.update = jest.fn().mockResolvedValue(mockUserRes);

        const user = await update(id, body, image);

        expect(user).toEqual(mockUserRes);
        expect(userRepository.update).toHaveBeenCalled();
    });

    it('should throw err if request failed', async () => {
        const image = { buffer: Buffer.from('test image'), mimetype: 'image/jpeg' };;
        const body = mockUser;
        const id = mockUser.id


        const result = { url: 'https://test.com/image.jpg' };

        body.photo = result.url

        cloudinary.uploader.upload = jest.fn().mockRejectedValue(err);

        userRepository.update = jest.fn().mockResolvedValue(err);

        await update(id, body, image);

        expect(err.message).toEqual(err.message);
    })
    
});

describe('create', () => {
    it('should return data user if update without image success', async() => {
        const body = mockUser;

        userRepository.create = jest.fn().mockResolvedValue(mockUserRes);

        const result = await create(body);

        expect(result).toEqual(mockUserRes);
        expect(userRepository.create).toHaveBeenCalled();
    });
    
});

describe('destroy', () => {
    it('should return all user', async () => {
        const id = mockUser.id

        userRepository.destroy = jest.fn().mockResolvedValue(null);

        const result = await destroy(id);

        expect(result).toBeNull();
        expect(userRepository.destroy).toHaveBeenCalled();
    });
});

describe('list', () => {
    it('should return all user', async () => {
        const role = mockUser.role;
        const users = [];

        users.push({
            ...mockUserRes
        });

        const count = users.length;

        userRepository.findAll = jest.fn().mockResolvedValue(users);
        userRepository.getTotalUser = jest.fn().mockResolvedValue(count);

        const result = await list(role);

        expect(result).toEqual({
            data: users,
            count: count
        });
        expect(userRepository.findAll).toHaveBeenCalled();
    });
    it('should throw err if request failed', async () => {
        const role = mockUser.role;
        userRepository.findAll = jest.fn().mockRejectedValue(err);

        await list(role);

        expect(err.message).toEqual(err.message);
    })
});

describe('get', () => {
    it('should return users by id', async () => {
        const id = mockUser.id

        userRepository.findUser = jest.fn().mockResolvedValue(mockUserRes);

        const result = await get();

        expect(result).toEqual(mockUserRes);
        expect(userRepository.findUser).toHaveBeenCalled();
    });
});


