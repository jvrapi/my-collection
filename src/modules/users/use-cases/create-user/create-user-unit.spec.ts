import { BcryptPasswordProvider } from '../../../../providers/password/bcrypt-password-provider';
import { PasswordProvider } from '../../../../providers/password/password-provider';
import { userData } from '../../../../tests/mocks/user';
import { InMemoryCardsRepository } from '../../../cards/repository/in-memory-collections-repository';
import { CollectionsRepository } from '../../../collection/repositories/collections-repository';
import { InMemoryCollectionsRepository } from '../../../collection/repositories/in-memory-collections-repository';
import { InMemoryUsersRepository } from '../../repositories/in-memory-users-repository';
import { UsersRepository } from '../../repositories/users-repository';
import { CreateUserUseCase } from './create-user-use-case';

jest.useFakeTimers();

describe('[unit] Create user', () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepository: UsersRepository;
  let collectionsRepository: CollectionsRepository;
  let cardsRepository: InMemoryCardsRepository;
  let passwordProvider: PasswordProvider;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    cardsRepository = new InMemoryCardsRepository();
    collectionsRepository = new InMemoryCollectionsRepository(cardsRepository);
    passwordProvider = new BcryptPasswordProvider();
    createUserUseCase = new CreateUserUseCase(usersRepository, collectionsRepository, passwordProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with same email', async () => {
    await createUserUseCase.execute(userData);

    await expect(createUserUseCase.execute(userData)).rejects.toThrowError();
  });

  it('should not be able to create a user with same username', async () => {
    await createUserUseCase.execute({
      ...userData,
      email: 'ihuguvur@ru.cu',
    });

    await expect(createUserUseCase.execute(userData)).rejects.toThrowError();
  });
});
