import { userData } from '../../../../tests/mocks/user';
import { InMemoryUsersRepository } from '../../repositories/in-memory-users-repository';
import { UsersRepository } from '../../repositories/users-repository';
import { GetUserUseCase } from './get-user-use-case';

describe('[unit] Get user', () => {
  let usersRepository: UsersRepository;
  let getUserUseCase: GetUserUseCase;
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserUseCase = new GetUserUseCase(usersRepository);
  });

  it('should be able to get an user', async () => {
    const findByIdSpy = jest.spyOn(usersRepository, 'findById');
    const userCreated = await usersRepository.create(userData);

    const user = await getUserUseCase.execute(userCreated.id);

    expect(findByIdSpy).toHaveBeenCalled();
    expect(user).toMatchObject(userCreated);
  });
});
