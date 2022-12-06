import { BcryptPasswordProvider } from '../../../../providers/password/bcrypt-password-provider';
import { PasswordProvider } from '../../../../providers/password/password-provider';
import { JwtTokenProvider } from '../../../../providers/token/jwt-token-provider';
import { TokenProvider } from '../../../../providers/token/token-provider';
import { userData } from '../../../../tests/mocks/user';
import { InMemoryUsersRepository } from '../../../users/repositories/in-memory-users-repository';
import { UsersRepository } from '../../../users/repositories/users-repository';
import { AuthenticateUserUseCase } from './authenticate-user-use-case';

describe('[unit] Authenticate user', () => {
  let usersRepository: UsersRepository;
  let passwordProvider: PasswordProvider;
  let tokenProvider: TokenProvider;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    passwordProvider = new BcryptPasswordProvider();
    tokenProvider = new JwtTokenProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      passwordProvider,
      tokenProvider,
    );
  });

  it('should be able to authenticate a user with email', async () => {
    const createUserSpy = jest.spyOn(usersRepository, 'create');
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    const findByUsernameSpy = jest.spyOn(usersRepository, 'findByUsername');
    const generateTokenSpy = jest.spyOn(tokenProvider, 'generateToken');
    const hashPasswordSpy = jest.spyOn(passwordProvider, 'hashPassword');

    const passwordHashed = await passwordProvider.hashPassword(userData.password);

    await usersRepository.create({
      ...userData,
      password: passwordHashed,
    });

    const token = await authenticateUserUseCase.execute({
      username: userData.email,
      password: userData.password,
    });

    expect(token).toBeDefined();
    expect(createUserSpy).toHaveBeenCalled();
    expect(findByEmailSpy).toHaveBeenCalled();
    expect(findByUsernameSpy).toHaveBeenCalled();
    expect(generateTokenSpy).toHaveBeenCalled();
    expect(hashPasswordSpy).toHaveBeenCalled();
  });

  it('should be able to authenticate a user with username', async () => {
    const createUserSpy = jest.spyOn(usersRepository, 'create');
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    const findByUsernameSpy = jest.spyOn(usersRepository, 'findByUsername');
    const generateTokenSpy = jest.spyOn(tokenProvider, 'generateToken');
    const hashPasswordSpy = jest.spyOn(passwordProvider, 'hashPassword');

    const passwordHashed = await passwordProvider.hashPassword(userData.password);

    await usersRepository.create({
      ...userData,
      password: passwordHashed,
    });

    const token = await authenticateUserUseCase.execute({
      username: userData.username,
      password: userData.password,
    });

    expect(token).toBeDefined();
    expect(createUserSpy).toHaveBeenCalled();
    expect(findByEmailSpy).not.toHaveBeenCalled();
    expect(findByUsernameSpy).toHaveBeenCalled();
    expect(generateTokenSpy).toHaveBeenCalled();
    expect(hashPasswordSpy).toHaveBeenCalled();
  });

  it('should not be able to authenticate user with invalid email', async () => {
    const createUserSpy = jest.spyOn(usersRepository, 'create');
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    const findByUsernameSpy = jest.spyOn(usersRepository, 'findByUsername');
    const generateTokenSpy = jest.spyOn(tokenProvider, 'generateToken');
    const hashPasswordSpy = jest.spyOn(passwordProvider, 'hashPassword');

    await expect(authenticateUserUseCase.execute({
      username: 'me@kokfaphup.ve',
      password: 'TcGAIRE2sQ',
    })).rejects.toThrow();

    expect(createUserSpy).not.toHaveBeenCalled();
    expect(findByEmailSpy).toHaveBeenCalled();
    expect(findByUsernameSpy).toHaveBeenCalled();
    expect(generateTokenSpy).not.toHaveBeenCalled();
    expect(hashPasswordSpy).not.toHaveBeenCalled();
  });

  it('should not be able to authenticate user with invalid username', async () => {
    const createUserSpy = jest.spyOn(usersRepository, 'create');
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    const findByUsernameSpy = jest.spyOn(usersRepository, 'findByUsername');
    const generateTokenSpy = jest.spyOn(tokenProvider, 'generateToken');
    const hashPasswordSpy = jest.spyOn(passwordProvider, 'hashPassword');

    await expect(authenticateUserUseCase.execute({
      username: 'YhrpGqlePe',
      password: 'TcGAIRE2sQ',
    })).rejects.toThrow();

    expect(findByUsernameSpy).toHaveBeenCalled();
    expect(findByEmailSpy).not.toHaveBeenCalled();
    expect(createUserSpy).not.toHaveBeenCalled();
    expect(generateTokenSpy).not.toHaveBeenCalled();
    expect(hashPasswordSpy).not.toHaveBeenCalled();
  });

  it('should not be able to authenticate user with wrong password', async () => {
    const createUserSpy = jest.spyOn(usersRepository, 'create');
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    const findByUsernameSpy = jest.spyOn(usersRepository, 'findByUsername');
    const generateTokenSpy = jest.spyOn(tokenProvider, 'generateToken');
    const hashPasswordSpy = jest.spyOn(passwordProvider, 'hashPassword');

    const passwordHashed = await passwordProvider.hashPassword(userData.password);

    const validatePasswordSpy = jest.spyOn(passwordProvider, 'compare');

    await usersRepository.create({
      ...userData,
      password: passwordHashed,
    });

    await expect(authenticateUserUseCase.execute({
      username: userData.email,
      password: 'TcGAIRE2sQ',
    })).rejects.toThrow();

    expect(createUserSpy).toHaveBeenCalled();
    expect(findByEmailSpy).toHaveBeenCalled();
    expect(findByUsernameSpy).toHaveBeenCalled();
    expect(hashPasswordSpy).toHaveBeenCalled();
    expect(validatePasswordSpy).toHaveBeenCalled();
    expect(generateTokenSpy).not.toHaveBeenCalled();
  });

  it('should not be able to authenticate user without username or password', async () => {
    const createUserSpy = jest.spyOn(usersRepository, 'create');
    const findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    const findByUsernameSpy = jest.spyOn(usersRepository, 'findByUsername');
    const generateTokenSpy = jest.spyOn(tokenProvider, 'generateToken');
    const hashPasswordSpy = jest.spyOn(passwordProvider, 'hashPassword');

    await expect(authenticateUserUseCase.execute({
      username: 'me@kokfaphup.ve',
      password: '',
    })).rejects.toThrow();

    await expect(authenticateUserUseCase.execute({
      username: '',
      password: 'vxejL8bqOp',
    })).rejects.toThrow();

    expect(createUserSpy).not.toHaveBeenCalled();
    expect(findByEmailSpy).not.toHaveBeenCalled();
    expect(findByUsernameSpy).not.toHaveBeenCalled();
    expect(generateTokenSpy).not.toHaveBeenCalled();
    expect(hashPasswordSpy).not.toHaveBeenCalled();
  });
});
