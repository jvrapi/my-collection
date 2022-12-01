import { Inject, Service } from "typedi";
import { ScryfallRepository } from "../../../scryfall/repositories/scryfall-repository";
import { CardsRepository } from "../../repositories/cards-repository";

@Service()
export class GetCollectionUseUCase{

  
  constructor(
    @Inject('cardsRepository')
    private cardsRepository: CardsRepository,
    @Inject('scryfallRepository')
    private scryfallRepository: ScryfallRepository
  ){}

  async execute(userId: string){
    const cards = await this.cardsRepository.findCardsByUserId(userId)

    const cardsFormatted = await Promise.all(cards.map(async (card) => {
      const scryfallCard = await this.scryfallRepository.findCardById(card.scryfallId)
      return {
        id: card.scryfallId,
        quantity: card.quantity,
        imageUrl: scryfallCard?.imageUrl,
        addedAt: card.addedAt,
        updatedAt: card.updatedAt,
      }
    }))

    return cardsFormatted
  }  
}