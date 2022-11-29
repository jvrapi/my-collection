import { Inject, Service } from "typedi";
import { ApiError } from "../../../../errors/Error";
import { ScryfallRepository } from "../../../scryfall/repositories/scryfall-repository";
import { UsersRepository } from "../../../users/repositories/users-repository";
import { AddCard, CardsRepository } from "../../repositories/cards-repository";

@Service()
export class AddCardToCollectionUseCase{
  constructor(
    @Inject('cardsRepository')
    private cardsRepository: CardsRepository,
    @Inject('usersRepository')
    private usersRepository: UsersRepository,
    @Inject('scryfallRepository')
    private scryfallRepository: ScryfallRepository
  ){}

  async execute({quantity, scryfallCardId,userId}: AddCard){
    if(!quantity || quantity === 0){
      throw new ApiError('You need to provide an quantity')
    }
    
    if(!scryfallCardId){
      throw new ApiError('You need to provide an card')
    }
    
    const userExists = await this.usersRepository.findById(userId)

    if(!userExists){
      throw new ApiError('Invalid user')
    }

    const scryfallCard = await this.scryfallRepository.findCardById(scryfallCardId)

    if(!scryfallCard){
      throw new ApiError('Invalid card')
    }

    const cardAlreadyInCollection = await this.cardsRepository.findByCardIdAndUserId({
      scryfallCardId,
      userId
    })

    if(cardAlreadyInCollection){
      throw new ApiError('This card already in your collection')
    }

    const card = await this.cardsRepository.addCard({
      quantity,
      scryfallCardId,
      userId
    })

    return {
      id: card.scryfallId,
      imageUrl: scryfallCard.imageUrl
    }
  }
}