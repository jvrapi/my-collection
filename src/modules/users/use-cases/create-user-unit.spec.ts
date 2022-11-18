import { BcryptPasswordProvider } from "../../../providers/password-provider/bcrypt-password-provider"
import { PasswordProvider } from "../../../providers/password-provider/password-provider"
import { InMemoryUsersRepository } from "../repositories/in-memory-users-repositoryrepository"
import { UsersRepository } from "../repositories/users-repository"
import { CreateUserUseCase } from "./create-user-use-case"

jest.useFakeTimers()


describe('[unit] Create user', () => {
  let createUserUseCase: CreateUserUseCase
  let usersRepository: UsersRepository
  let passwordProvider: PasswordProvider
  
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    passwordProvider = new BcryptPasswordProvider()
    createUserUseCase = new CreateUserUseCase(usersRepository, passwordProvider)
  })
  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      email: 'zalari@fozorat.bd',
      name: 'Gabriel Figueroa',
      password: '2exyrQcg',
      username: 'QGULNpCoQD'
    })

    expect(user).toHaveProperty('id')
  })
 })