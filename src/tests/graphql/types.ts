import { Card as CardModel } from '../../dtos/models/card-model';
import { ScryfallCardModel } from '../../dtos/models/scryfall-card-model';
import { User as UserModel } from '../../dtos/models/users-model';

export interface UserCreated {
  createUser: UserModel
}

export interface UserUpdated {
  updateUser: UserModel
}

export interface UserAuthenticated {
  authenticateUser: {
    token: string
  }
}

export interface User {
  user: UserModel & {
    cards: CardModel[]
  }
}

export interface CardAdded {
  addCard: CardModel
}

export interface CardUpdated {
  updateCards: CardModel[]
}

export interface ScryfallCards {
  cards: ScryfallCardModel[]
}
