import { randomUUID } from "node:crypto"
import { userData } from "../../../../tests/mocks/user"
import { InMemoryUsersRepository } from "../../repositories/in-memory-users-repository"
import { UsersRepository } from "../../repositories/users-repository"
import { UpdateUserUseCase } from "./update-user-use-case"

describe('[unit] Update user', () => {
  let usersRepository: UsersRepository
  let updateUserUseCase: UpdateUserUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    updateUserUseCase = new UpdateUserUseCase(usersRepository)
  })

  it('should be able to update a user', async () => {
    const findByIdSpy = jest.spyOn(usersRepository,'findById')
    const findByEmailOrUsernameSpy = jest.spyOn(usersRepository,'findByEmailOrUsername')
    const saveSpy = jest.spyOn(usersRepository,'save')
    
    const user = await usersRepository.create(userData)
    
    await updateUserUseCase.execute({
      id: user.id,
      email: 'vi@arafbo.om',
      username: 'qXIwaDEaFY',
      name: 'Bertha Joseph'
    })

    expect(findByIdSpy).toHaveBeenCalled()
    expect(findByEmailOrUsernameSpy).toHaveBeenCalledTimes(2)
    expect(saveSpy).toHaveBeenCalled()
    
  })

  it('should not be able to update a non existing user', async () => {
    const findByIdSpy = jest.spyOn(usersRepository,'findById')
    const findByEmailOrUsernameSpy = jest.spyOn(usersRepository,'findByEmailOrUsername')
    const saveSpy = jest.spyOn(usersRepository,'save')
    
    await expect (updateUserUseCase.execute({
      id: randomUUID(),
      email: 'vi@arafbo.om',
      username: 'qXIwaDEaFY',
      name: 'Bertha Joseph'
    })).rejects.toThrow('Invalid user')

    expect(findByIdSpy).toHaveBeenCalled()
    expect(findByEmailOrUsernameSpy).not.toHaveBeenCalled()
    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should not be able to update email if his already in use', async () => {
    const findByIdSpy = jest.spyOn(usersRepository,'findById')
    const findByEmailOrUsernameSpy = jest.spyOn(usersRepository,'findByEmailOrUsername')
    const saveSpy = jest.spyOn(usersRepository,'save')

    const user = await usersRepository.create(userData)

    await usersRepository.create({
      email: 'ko@relzueho.mw',
      username: 'SDqkaSEURP',
      name: 'Mollie Vega',
      password: 'BrqSCbvzn4'
    })
    
    await expect (updateUserUseCase.execute({
      id: user.id,
      email: 'ko@relzueho.mw',
      username: 'qXIwaDEaFY',
      name: 'Bertha Joseph'
    })).rejects.toThrow('New email already in use')

    expect(findByIdSpy).toHaveBeenCalled()
    expect(findByEmailOrUsernameSpy).toHaveBeenCalled()
    expect(saveSpy).not.toHaveBeenCalled()
  })


  it('should not be able to update username if his already in use', async () => {
    const findByIdSpy = jest.spyOn(usersRepository,'findById')
    const findByEmailOrUsernameSpy = jest.spyOn(usersRepository,'findByEmailOrUsername')
    const saveSpy = jest.spyOn(usersRepository,'save')

    const user = await usersRepository.create(userData)

    await usersRepository.create({
      email: 'ko@relzueho.mw',
      username: 'SDqkaSEURP',
      name: 'Mollie Vega',
      password: 'BrqSCbvzn4'
    })
    
    await expect (updateUserUseCase.execute({
      id: user.id,
      email: 'sej@owkur.ax',
      username: 'SDqkaSEURP',
      name: 'Bertha Joseph'
    })).rejects.toThrow('New username already in use')

    expect(findByIdSpy).toHaveBeenCalled()
    expect(findByEmailOrUsernameSpy).toHaveBeenCalled()
    expect(saveSpy).not.toHaveBeenCalled()
  })
})