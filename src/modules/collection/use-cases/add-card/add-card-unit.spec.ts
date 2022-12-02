import { randomUUID } from "node:crypto"
import { userData } from "../../../../tests/mocks/user"
import { InMemoryCardsRepository } from "../../../cards/repository/in-memory-collections-repository"
import { InMemoryScryfallRepository } from "../../../scryfall/repositories/in-memory-scryfall-repository"
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory-users-repository"
import { InMemoryCollectionsRepository } from "../../repositories/in-memory-collections-repository"
import { AddCardToCollectionUseCase } from "./add-card-use-case"

describe('[unit] Add card to collection', () => {
  let cardsRepository: InMemoryCardsRepository
  let usersRepository: InMemoryUsersRepository
  let scryfallRepository: InMemoryScryfallRepository
  let collectionsRepository: InMemoryCollectionsRepository
  let addCardToCollectionUseCase: AddCardToCollectionUseCase
  
  const scryfallCard = {
    id: randomUUID(),
    imageUrl: ''
  }

  beforeEach(() => {
    cardsRepository = new InMemoryCardsRepository()
    usersRepository = new InMemoryUsersRepository()
    scryfallRepository = new InMemoryScryfallRepository(scryfallCard)
    collectionsRepository = new InMemoryCollectionsRepository(cardsRepository)
    addCardToCollectionUseCase = new AddCardToCollectionUseCase(collectionsRepository, cardsRepository,  scryfallRepository)
  })


  it('should be able to add card to collection', async () => {
    const addCardSpy = jest.spyOn(cardsRepository, 'addCard')
    const findCardByIdSpy = jest.spyOn(scryfallRepository, 'findCardById')
    const user = await usersRepository.create(userData)
    await collectionsRepository.create(user.id)
    
    const card = await addCardToCollectionUseCase.execute({
      scryfallCardId: scryfallCard.id,
      quantity: 1,
      userId: user.id
    })

    expect(card.id).toBeDefined()
    expect(addCardSpy).toHaveBeenCalled()
    expect(findCardByIdSpy).toHaveBeenCalled()

  })

  it('should not be able to add card to collection without an quantity', async () => {
    const addCardSpy = jest.spyOn(cardsRepository, 'addCard')
    const findCardByIdSpy = jest.spyOn(scryfallRepository, 'findCardById')

    
    await expect(addCardToCollectionUseCase.execute({
      quantity: 0,
      scryfallCardId: randomUUID(),
      userId: randomUUID()
    })).rejects.toThrow('You need to provide an quantity')
    
    expect(addCardSpy).not.toHaveBeenCalled()
    expect(findCardByIdSpy).not.toHaveBeenCalled()
  })

  it('should not be able to add card to collection without an card id', async () => {
    const addCardSpy = jest.spyOn(cardsRepository, 'addCard')
    const findCardByIdSpy = jest.spyOn(scryfallRepository, 'findCardById')
    
    await expect(addCardToCollectionUseCase.execute({
      quantity: 1,
      scryfallCardId: '',
      userId: randomUUID()
    })).rejects.toThrow('You need to provide an card')
    
    expect(addCardSpy).not.toHaveBeenCalled()
    expect(findCardByIdSpy).not.toHaveBeenCalled()
  })

  it('should not be able to add card to collection with invalid card', async () => {
    const addCardSpy = jest.spyOn(cardsRepository, 'addCard')
    const findCardByIdSpy = jest.spyOn(scryfallRepository, 'findCardById')

    const user = await usersRepository.create(userData)
    await collectionsRepository.create(user.id)
    
    
    await expect(addCardToCollectionUseCase.execute({
      quantity: 1,
      userId: user.id,
      scryfallCardId: randomUUID()
    })).rejects.toThrow('Invalid card')
    
    expect(addCardSpy).not.toHaveBeenCalled()
    expect(findCardByIdSpy).toHaveBeenCalled()
  })

  it('should not be able to add an card to collection if his already in collection', async () => {
    const addCardSpy = jest.spyOn(cardsRepository, 'addCard')
    const findCardByIdSpy = jest.spyOn(scryfallRepository, 'findCardById')
    const findByCardIdAndCollectionId = jest.spyOn(cardsRepository, 'findByCardIdAndCollectionId')
    
    const user = await usersRepository.create(userData)
    await collectionsRepository.create(user.id)
    
    await addCardToCollectionUseCase.execute({
      scryfallCardId: scryfallCard.id,
      quantity: 1,
      userId: user.id
    })
    
    await expect(addCardToCollectionUseCase.execute({
      scryfallCardId: scryfallCard.id,
      quantity: 1,
      userId: user.id
    })).rejects.toThrow('This card already in your collection')

    expect(findCardByIdSpy).toHaveBeenCalled()
    expect(findByCardIdAndCollectionId).toHaveBeenCalled()
    expect(addCardSpy).toHaveBeenCalledTimes(1)

  })
})