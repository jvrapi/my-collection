import { randomUUID } from "node:crypto"
import { userData } from "../../../../tests/mocks/user"
import { InMemoryScryfallRepository } from "../../../scryfall/repositories/in-memory-scryfall-repository"
import { ScryfallRepository } from "../../../scryfall/repositories/scryfall-repository"
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory-users-repository"
import { UsersRepository } from "../../../users/repositories/users-repository"
import { CardsRepository } from "../../repositories/cards-repository"
import { InMemoryCardsRepository } from "../../repositories/in-memory-cards-repository"
import { UpdateCardsUseCase } from "./update-cards-use-case"

describe('[unit] Update cards', () => {
  let cardsRepository: CardsRepository
  let usersRepository: UsersRepository
  let updateCardsUseCase: UpdateCardsUseCase
  let scryfallRepository: ScryfallRepository

  const scryfallCard = {
    id: randomUUID(),
    imageUrl: ''
  }

  beforeEach(() => {
    cardsRepository = new InMemoryCardsRepository()
    usersRepository = new InMemoryUsersRepository()
    scryfallRepository = new InMemoryScryfallRepository(scryfallCard)
    updateCardsUseCase = new UpdateCardsUseCase(cardsRepository, scryfallRepository)
  })

  it('should be able to update quantity of an card in collection', async () => {
    const user = await usersRepository.create(userData)
    const card = await cardsRepository.addCard({
      scryfallCardId: scryfallCard.id,
      userId: user.id,
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
    await expect( updateCardsUseCase.execute({
      userId: randomUUID(),
      cards: [{
        cardId: randomUUID(),
        quantity: 1
      }] 
     })).rejects.toThrow('Some card is not in collection')
  })

  
})