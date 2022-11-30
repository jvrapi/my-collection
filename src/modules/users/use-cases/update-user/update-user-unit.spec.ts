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
    const findByEmailSpy = jest.spyOn(usersRepository,'findByEmail')
    const findByUsernameSpy = jest.spyOn(usersRepository,'findByUsername')
    const saveSpy = jest.spyOn(usersRepository,'save')
    
    const user = await usersRepository.create(userData)
    
    await updateUserUseCase.execute({
      id: user.id,
      email: 'vi@arafbo.om',
      username: 'qXIwaDEaFY',
      name: 'Bertha Joseph'
    })

    expect(findByIdSpy).toHaveBeenCalled()
    expect(findByEmailSpy).toHaveBeenCalled()
    expect(findByUsernameSpy).toHaveBeenCalled()
    expect(saveSpy).toHaveBeenCalled()
    
  })

 

  it('should not be able to update email if his already in use', async () => {
    const findByIdSpy = jest.spyOn(usersRepository,'findById')
    const findByEmailSpy = jest.spyOn(usersRepository,'findByEmail')
    const findByUsernameSpy = jest.spyOn(usersRepository,'findByUsername')
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
    expect(findByUsernameSpy).not.toHaveBeenCalled()
    expect(findByEmailSpy).toHaveBeenCalled()
    expect(saveSpy).not.toHaveBeenCalled()
  })


  it('should not be able to update username if his already in use', async () => {
    const findByIdSpy = jest.spyOn(usersRepository,'findById')
    const findByEmailSpy = jest.spyOn(usersRepository,'findByEmail')
    const findByUsernameSpy = jest.spyOn(usersRepository,'findByUsername')
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
    expect(findByUsernameSpy).toHaveBeenCalled()
    expect(findByEmailSpy).toHaveBeenCalled()
    expect(saveSpy).not.toHaveBeenCalled()
  })
})