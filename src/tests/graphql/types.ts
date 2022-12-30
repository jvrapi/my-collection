import { Pagination } from '../../dtos/models/pagination-model';
import { Card } from '../../modules/scryfall/dtos/models/card-model';
import { Set } from '../../modules/scryfall/dtos/models/set-model';
import { UserCard } from '../../modules/users/dtos/models/card-model';
import { UserCards } from '../../modules/users/dtos/models/cards-model';
import { User as UserModel } from '../../modules/users/dtos/models/user-model';

interface ItensPaginated<T> {
  items: T[]
  pagination: Pagination
}

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
    cards: UserCards
  }
}

export interface CardAdded {
  addCard: UserCard
}

export interface CardUpdated {
  updateCards: UserCard[]
}

export interface ScryfallCards {
  cards: ItensPaginated<Card>
}

export interface ScryfallSets {
  sets: {
    items: Set[],
    pagination: Pagination
  }
}
