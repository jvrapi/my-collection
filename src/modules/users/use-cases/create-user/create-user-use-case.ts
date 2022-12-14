import { Inject, Service } from 'typedi';
import { ApiError } from '../../../../errors/Error';
import { PasswordProvider } from '../../../../providers/password/password-provider';
import { CollectionsRepository } from '../../../collection/repositories/collections-repository';
import { CreateUserInput } from '../../dtos/inputs/create-user-input';
import { UsersRepository } from '../../repositories/users-repository';

@Service()
export class CreateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: UsersRepository,

    @Inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,

    @Inject('BcryptProvider')
    private passwordProvider: PasswordProvider,
  ) {}

  async execute({
    name,
    email,
    password,
    username,
  }: CreateUserInput) {
    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);
    const usernameAlreadyInUse = await this.usersRepository.findByUsername(username);

    if (emailAlreadyInUse) {
      throw new ApiError('E-mail already in use');
    }

    if (usernameAlreadyInUse) {
      throw new ApiError('Username already in use');
    }

    const passwordHashed = await this.passwordProvider.hashPassword(password);

    const userCreated = await this.usersRepository.create({
      email,
      name,
      password: passwordHashed,
      username,
    });

    await this.collectionsRepository.create(userCreated.id);

    return {
      id: userCreated.id,
    };
  }
}
