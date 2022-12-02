import { randomUUID } from "node:crypto"
import { userData } from "../../../../tests/mocks/user"
import { InMemoryCardsRepository } from "../../../cards/repository/in-memory-collections-repository"
import { InMemoryScryfallRepository } from "../../../scryfall/repositories/in-memory-scryfall-repository"
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory-users-repository"
import { InMemoryCollectionsRepository } from "../../repositories/in-memory-collections-repository"
import { UpdateCardsUseCase } from "./update-cards-use-case"

describe('[unit] Update cards', () => {
  let cardsRepository: InMemoryCardsRepository
  let usersRepository: InMemoryUsersRepository
  let scryfallRepository: InMemoryScryfallRepository
  let collectionsRepository: InMemoryCollectionsRepository
  let updateCardsUseCase: UpdateCardsUseCase

  const scryfallCard = {
    id: randomUUID(),
    imageUrl: ''
  }

  beforeEach(() => {
    cardsRepository = new InMemoryCardsRepository()
    usersRepository = new InMemoryUsersRepository()
    scryfallRepository = new InMemoryScryfallRepository(scryfallCard)
    collectionsRepository = new InMemoryCollectionsRepository(cardsRepository)
    updateCardsUseCase = new UpdateCardsUseCase(cardsRepository, scryfallRepository, collectionsRepository)
  })

  it('should be able to update quantity of an card in collection', async () => {
    const user = await usersRepository.create(userData)
    const {id: collectionId} = await collectionsRepository.create(user.id)

    const card = await cardsRepository.addCard({
      scryfallCardId: scryfallCard.id,
      collectionId,
      quantity: 1
    })

    const cardsUpdate = await updateCardsUseCase.execute({
     userId: user.id,
     cards: [{
      cardId: card.scryfallId,
      quantity: 2
     }] 
    })

    expect(cardsUpdate[0].quantity).toEqual(2)

  })

  it('should not be able to update with empty array', async () => {
    await expect( updateCardsUseCase.execute({
      userId: randomUUID(),
      cards: [] 
     })).rejects.toThrow('You need to provide at least an card to be updated')
  })

  it('should not be able to update a card if his his not in collection', async () => {
    const userId = randomUUID() 
    await collectionsRepository.create(userId)
    await expect( updateCardsUseCase.execute({
      userId,
      cards: [{
        cardId: randomUUID(),
        quantity: 1
      }] 
     })).rejects.toThrow('Some card is not in collection')
  })

  
})