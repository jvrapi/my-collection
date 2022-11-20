"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_password_provider_1 = require("../../../providers/password-provider/bcrypt-password-provider");
const in_memory_users_repositoryrepository_1 = require("../repositories/in-memory-users-repositoryrepository");
const create_user_use_case_1 = require("./create-user-use-case");
jest.useFakeTimers();
describe('[unit] Create user', () => {
    let createUserUseCase;
    let usersRepository;
    let passwordProvider;
    beforeEach(() => {
        usersRepository = new in_memory_users_repositoryrepository_1.InMemoryUsersRepository();
        passwordProvider = new bcrypt_password_provider_1.BcryptPasswordProvider();
        createUserUseCase = new create_user_use_case_1.CreateUserUseCase(usersRepository, passwordProvider);
    });
    it('should be able to create a new user', async () => {
        const user = await createUserUseCase.execute({
            email: 'zalari@fozorat.bd',
            name: 'Gabriel Figueroa',
            password: '2exyrQcg',
            username: 'QGULNpCoQD'
        });
        expect(user).toHaveProperty('id');
    });
    it('should not be able to create a user with same email', async () => {
        const sameEmail = 'zalari@fozorat.bd';
        await createUserUseCase.execute({
            email: sameEmail,
            name: 'Peter Tate',
            password: '2exyrQcg',
            username: 'dudvxVzgJB'
        });
        await expect(createUserUseCase.execute({
            email: sameEmail,
            name: 'Catherine Patterson',
            password: '2exyrQcg',
            username: 'SHqdqjGAOb'
        })).rejects.toThrowError();
    });
    it('should not be able to create a user with same username', async () => {
        const sameUsername = 'pNoHfGjvJP';
        await createUserUseCase.execute({
            email: 'opaug@inhug.bi',
            name: 'Carolyn Watson',
            password: '2exyrQcg',
            username: sameUsername
        });
        await expect(createUserUseCase.execute({
            email: 'garweja@fazbil.vi',
            name: 'Etta Smith',
            password: '2exyrQcg',
            username: sameUsername
        })).rejects.toThrowError();
    });
});
