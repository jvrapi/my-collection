import { randomUUID } from "node:crypto"
import { userData } from "../../../tests/mocks/user"
import { InMemoryScryfallRepository } from "../../scryfall/repositories/in-memory-scryfall-repository"
import { ScryfallRepository } from "../../scryfall/repositories/scryfall-repository"
import { InMemoryUsersRepository } from "../../users/repositories/in-memory-users-repository"
import { UsersRepository } from "../../users/repositories/users-repository"
import { CardsRepository } from "../repositories/cards-repository"
import { InMemoryCardsRepository } from "../repositories/in-memory-cards-repository"
import { AddCardToCollectionUseCase } from "./add-card-to-collection-use-case"

describe('[unit] Add card to collection', () => {
  let cardsRepository: CardsRepository
  let usersRepository: UsersRepository
  let addCardToCollectionUseCase: AddCardToCollectionUseCase
  let scryfallRepository: ScryfallRepository
  const scryfallCard = {
    id: randomUUID(),
    imageUrl: ''
  }

  beforeEach(() => {
    cardsRepository = new InMemoryCardsRepository()
    usersRepository = new InMemoryUsersRepository()
    scryfallRepository = new InMemoryScryfallRepository(scryfallCard)
    addCardToCollectionUseCase = new AddCardToCollectionUseCase(cardsRepository, usersRepository, scryfallRepository)
  })


  it('should be able to add card to collection', async () => {
    const addCardSpy = jest.spyOn(cardsRepository, 'addCard')
    const findUserByIdSpy = jest.spyOn(usersRepository, 'findById')
    const findCardByIdSpy = jest.spyOn(scryfallRepository, 'findCardById')
    const user = await usersRepository.create(userData)
    
    
    const card = await addCardToCollectionUseCase.execute({
      scryfallCardId: scryfallCard.id,
      quantity: 1,
      userId: user.id
    })

    expect(card.id).toBeDefined()
    expect(addCardSpy).toHaveBeenCalled()
    expect(findUserByIdSpy).toHaveBeenCalled()
    expect(findCardByIdSpy).toHaveBeenCalled()

  })

  it('should not be able to add card to collection without an quantity', async () => {
    const addCardSpy = jest.spyOn(cardsRepository, 'addCard')
    const findUserByIdSpy = jest.spyOn(usersRepository, 'findById')
    const findCardByIdSpy = jest.spyOn(scryfallRepository, 'findCardById')

    
    await expect(addCardToCollectionUseCase.execute({
      quantity: 0,
      scryfallCardId: randomUUID(),
      userId: randomUUID()
    })).rejects.toThrow('You need to provide an quantity')
    
    expect(addCardSpy).not.toHaveBeenCalled()
    expect(findUserByIdSpy).not.toHaveBeenCalled()
    expect(findCardByIdSpy).not.toHaveBeenCalled()
  })

  it('should not be able to add card to collection without an card id', async () => {
    const addCardSpy = jest.spyOn(cardsRepository, 'addCard')
    const findUserByIdSpy = jest.spyOn(usersRepository, 'findById')
    const findCardByIdSpy = jest.spyOn(scryfallRepository, 'findCardById')
    
    await expect(addCardToCollectionUseCase.execute({
      quantity: 1,
      scryfallCardId: '',
      userId: randomUUID()
    })).rejects.toThrow('You need to provide an card')
    
    expect(addCardSpy).not.toHaveBeenCalled()
    expect(findUserByIdSpy).not.toHaveBeenCalled()
    expect(findCardByIdSpy).not.toHaveBeenCalled()
  })

  it('should not be able to add card to collection with invalid user', async () => {
    const addCardSpy = jest.spyOn(cardsRepository, 'addCard')
    const findUserByIdSpy = jest.spyOn(usersRepository, 'findById')
    
    await expect(addCardToCollectionUseCase.execute({
      quantity: 1,
      userId: '',
      scryfallCardId: randomUUID()
    })).rejects.toThrow('Invalid user')
    
    expect(addCardSpy).not.toHaveBeenCalled()
    expect(findUserByIdSpy).toHaveBeenCalled()
  })

  it('should not be able to add card to collection with invalid card', async () => {
    const addCardSpy = jest.spyOn(cardsRepository, 'addCard')
    const findUserByIdSpy = jest.spyOn(usersRepository, 'findById')
    const findCardByIdSpy = jest.spyOn(scryfallRepository, 'findCardById')

    const user = await usersRepository.create(userData)
    
    
    await expect(addCardToCollectionUseCase.execute({
      quantity: 1,
      userId: user.id,
      scryfallCardId: randomUUID()
    })).rejects.toThrow('Invalid card')
    
    expect(addCardSpy).not.toHaveBeenCalled()
    expect(findUserByIdSpy).toHaveBeenCalled()
    expect(findCardByIdSpy).toHaveBeenCalled()
  })
})