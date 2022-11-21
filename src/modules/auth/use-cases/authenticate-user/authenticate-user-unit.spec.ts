import { User } from "@prisma/client"
import { BcryptPasswordProvider } from "../../../../providers/password/bcrypt-password-provider"
import { PasswordProvider } from "../../../../providers/password/password-provider"
import { JwtTokenProvider } from "../../../../providers/token/jwt-token-provider"
import { GenerateToken, TokenProvider } from "../../../../providers/token/token-provider"
import { userData } from "../../../../tests/mocks/user"
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory-users-repository"
import { CreateUser, UserCreated, UsersRepository } from "../../../users/repositories/users-repository"
import { AuthenticateUserUseCase } from "./authenticate-user-use-case"

describe('[unit] Authenticate user', () => {
  let usersRepository: UsersRepository
  let passwordProvider: PasswordProvider
  let tokenProvider: TokenProvider
  let authenticateUserUseCase: AuthenticateUserUseCase
  let createUserSpy: jest.SpyInstance<Promise<UserCreated>, [user: CreateUser]>
  let findByEmailOrUsernameSpy: jest.SpyInstance<Promise<User | null>, [email?: string | undefined, username?: string | undefined]> 
  let generateTokenSpy: jest.SpyInstance<string, [GenerateToken]>
  let hashPasswordSpy: jest.SpyInstance<Promise<string>, [password: string]>
  
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    passwordProvider = new BcryptPasswordProvider()
    tokenProvider = new JwtTokenProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, passwordProvider, tokenProvider)
    createUserSpy = jest.spyOn(usersRepository, 'create')
    findByEmailOrUsernameSpy = jest.spyOn(usersRepository, 'findByEmailOrUsername')
    generateTokenSpy = jest.spyOn(tokenProvider, 'generateToken')
     hashPasswordSpy = jest.spyOn(passwordProvider, 'hashPassword')
  })

  it('should be able to authenticate a user', async () => {
   
    const passwordHashed = await passwordProvider.hashPassword(userData.password)
    
    
    await usersRepository.create({
      ...userData,
      password: passwordHashed
    })

    const token = await authenticateUserUseCase.execute({
      username: userData.email,
      password: userData.password
    })

    expect(token).toBeDefined()
    expect(createUserSpy).toHaveBeenCalled()
    expect(findByEmailOrUsernameSpy).toHaveBeenCalled()
    expect(generateTokenSpy).toHaveBeenCalled()
    expect(hashPasswordSpy).toHaveBeenCalled()
  })

  it('should not be able to authenticate user with invalid email', async () => {
    await expect(authenticateUserUseCase.execute({
      username: 'me@kokfaphup.ve',
      password: 'TcGAIRE2sQ'
    })).rejects.toThrow()

    expect(createUserSpy).not.toHaveBeenCalled()
    expect(findByEmailOrUsernameSpy).toHaveBeenCalled()
    expect(generateTokenSpy).not.toHaveBeenCalled()
    expect(hashPasswordSpy).not.toHaveBeenCalled()
  })

  it('should not be able to authenticate user with invalid username', async () => {
    await expect(authenticateUserUseCase.execute({
      username: 'YhrpGqlePe',
      password: 'TcGAIRE2sQ'
    })).rejects.toThrow()

    expect(createUserSpy).not.toHaveBeenCalled()
    expect(findByEmailOrUsernameSpy).toHaveBeenCalled()
    expect(generateTokenSpy).not.toHaveBeenCalled()
    expect(hashPasswordSpy).not.toHaveBeenCalled()
  })

  it('should not be able to authenticate user with wrong password', async () => {
   

    const passwordHashed = await passwordProvider.hashPassword(userData.password)
    
    const validatePasswordSpy = jest.spyOn(passwordProvider, 'compare')
    
    await usersRepository.create({
      ...userData,
      password: passwordHashed
    })


    await expect(authenticateUserUseCase.execute({
      username: userData.email,
      password: 'TcGAIRE2sQ'
    })).rejects.toThrow()


    expect(createUserSpy).toHaveBeenCalled()
    expect(findByEmailOrUsernameSpy).toHaveBeenCalled()
    expect(hashPasswordSpy).toHaveBeenCalled()
    expect(validatePasswordSpy).toHaveBeenCalled()
    expect(generateTokenSpy).not.toHaveBeenCalled()
  })

  it('should not be able to authenticate user without username or password', async () => {
    await expect(authenticateUserUseCase.execute({
      username: 'me@kokfaphup.ve',
      password: ''
    })).rejects.toThrow()
    
    
    await expect(authenticateUserUseCase.execute({
      username: '',
      password: 'vxejL8bqOp'
    })).rejects.toThrow()

    expect(createUserSpy).not.toHaveBeenCalled()
    expect(findByEmailOrUsernameSpy).not.toHaveBeenCalled()
    expect(generateTokenSpy).not.toHaveBeenCalled()
    expect(hashPasswordSpy).not.toHaveBeenCalled()
  })
})