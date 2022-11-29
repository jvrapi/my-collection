import { Inject, Service } from "typedi";
import { ApiError } from "../../../../errors/Error";
import { ScryfallRepository } from "../../../scryfall/repositories/scryfall-repository";
import { CardsRepository } from "../../repositories/cards-repository";

interface Card {
  cardId: string,
  quantity: number
}

interface UpdateCards {
  userId: string,
  cards: Card[]
}

@Service()
export class UpdateCardsUseCase {
  constructor(
    @Inject('cardsRepository')
    private cardsRepository: CardsRepository,
    @Inject('scryfallRepository')
    private scryfallRepository: ScryfallRepository
  ){}

  async execute({userId, cards}: UpdateCards){
    if(cards?.length === 0){
      throw new ApiError('You need to provide at least an card to be updated')
    }

    for await (const card of cards){
      const cardInCollection = await this.cardsRepository.findByCardIdAndUserId({
        userId,
        scryfallCardId: card.cardId
      })

      if(!cardInCollection){
        throw new ApiError('Some card is not in collection')
      }
    }

    const cardsUpdated = await Promise.all(cards.map(async ({cardId, quantity}) => {
      const card = await this.cardsRepository.saveCard({quantity,scryfallCardId: cardId, userId})
      const scryfallCard = await this.scryfallRepository.findCardById(cardId)
      return {
        id: card.scryfallId,
        quantity: card.quantity,
        addedAt: card.addedAt,
        imageUrl: scryfallCard?.imageUrl
      } 
    }))

    return cardsUpdated

  }
}