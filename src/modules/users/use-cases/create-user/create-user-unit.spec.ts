import { BcryptPasswordProvider } from "../../../../providers/password-provider/bcrypt-password-provider"
import { PasswordProvider } from "../../../../providers/password-provider/password-provider"
import { InMemoryUsersRepository } from "../../repositories/in-memory-users-repository"
import { UsersRepository } from "../../repositories/users-repository"
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

  it('should not be able to create a user with same email', async () => {
    const sameEmail = 'zalari@fozorat.bd' 
    
    
    await createUserUseCase.execute({
      email: sameEmail,
      name: 'Peter Tate',
      password: '2exyrQcg',
      username: 'dudvxVzgJB'
    })

    await expect(createUserUseCase.execute({
      email: sameEmail,
      name: 'Catherine Patterson',
      password: '2exyrQcg',
      username: 'SHqdqjGAOb'
    })).rejects.toThrowError()

  })

  it('should not be able to create a user with same username', async () => {
    const sameUsername = 'pNoHfGjvJP' 
    
    
    await createUserUseCase.execute({
      email: 'opaug@inhug.bi',
      name: 'Carolyn Watson',
      password: '2exyrQcg',
      username: sameUsername
    })

    await expect(createUserUseCase.execute({
      email: 'garweja@fazbil.vi',
      name: 'Etta Smith',
      password: '2exyrQcg',
      username: sameUsername
    })).rejects.toThrowError()

  })
 })