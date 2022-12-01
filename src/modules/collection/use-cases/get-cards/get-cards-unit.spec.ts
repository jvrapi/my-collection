import { randomUUID } from "node:crypto"
import { InMemoryScryfallRepository } from "../../../scryfall/repositories/in-memory-scryfall-repository"
import { ScryfallRepository } from "../../../scryfall/repositories/scryfall-repository"
import { CardsRepository } from "../../repositories/cards-repository"
import { InMemoryCardsRepository } from "../../repositories/in-memory-cards-repository"
import { GetCardsUseCase } from "./get-cards-use-case"

describe('[unit] Get cards', () => {
  let cardsRepository: CardsRepository
  let scryfallRepository: ScryfallRepository
  let getCardsUseCase: GetCardsUseCase

  const scryfallCard = {
    id: randomUUID(),
    imageUrl: ''
  }

  beforeEach(() => {
    cardsRepository = new InMemoryCardsRepository()
    scryfallRepository = new InMemoryScryfallRepository(scryfallCard)
    getCardsUseCase = new GetCardsUseCase(cardsRepository, scryfallRepository)
  })

  it('should be able to list user cards', async () => {
    const userId =  randomUUID() 
    const card = await cardsRepository.addCard({
      quantity: 1,
      scryfallCardId: scryfallCard.id,
      userId
    })
    const userCards = await getCardsUseCase.execute(userId)
    
    expect(userCards.length).toBe(1)
    expect(userCards.shift()).toMatchObject(card)
  })
})