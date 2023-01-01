const userRepository = require("../../app/repositories/userRepository");
const { User } = require('../../app/models')
const bcrypt = require('bcryptjs')

const {
    create,
    destroy,
    findAll,
    findUser,
    getTotalUser,
    update
} = userRepository

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

describe('create', () => {
    it('should return data user if create success', async() => {
        const body = mockUser;
        User.create = jest.fn().mockResolvedValue(mockUserRes)

        const result = await create(body);

        expect(result).toEqual(mockUserRes);
    });
});

describe('update', () => {
    it('should return data user if update success', async() => {
        const body = mockUser;
        const id = mockUser.id;
        User.update = jest.fn().mockResolvedValue(mockUserRes)

        const result = await update(id, body);

        expect(result).toEqual(mockUserRes);
    });
});

describe('findAll', () => {
    it('should return all data user if request success', async() => {
        const mockUserList = [];

        mockUserList.push({
            ...mockUserRes
        });

        User.findAll = jest.fn().mockResolvedValue(mockUserList)

        const result = await findAll();

        expect(result).toEqual(mockUserList);
    });
}); 

describe('getTotalUser', () => {
    it('should return count data user if request success', async() => {
        const mockUserList = [];

        mockUserList.push({
            ...mockUserRes
        });

        const count = mockUserList.length;

        User.count = jest.fn().mockResolvedValue(count)

        const result = await getTotalUser();

        expect(result).toEqual(count);
    });
}); 

describe('findUser', () => {
    it('should return data user by id if request success', async() => {
        const condition = {
            id: mockUser.id
        }
        User.findOne = jest.fn().mockResolvedValue(mockUser)

        const result = await findUser(condition);

        expect(result).toEqual(mockUser);
    });
});

describe('destroy', () => {
    it('should return if delete success', async() => {
        const id = mockUser.id
        User.destroy = jest.fn().mockResolvedValue(1)

        const result = await destroy(id);

        expect(result).toEqual(1);
    });
}); 

