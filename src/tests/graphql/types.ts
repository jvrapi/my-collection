import { UserCardModel } from '../../dtos/models/user-card-model';
import { Pagination } from '../../dtos/models/pagination-model';
import { ScryfallCardModel } from '../../dtos/models/scryfall-card-model';
import { Set } from '../../dtos/models/set-model';
import { User as UserModel } from '../../dtos/models/users-model';

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
    cards: UserCardModel[]
  }
}

export interface CardAdded {
  addCard: UserCardModel
}

export interface CardUpdated {
  updateCards: UserCardModel[]
}

export interface ScryfallCards {
  cards: ItensPaginated<ScryfallCardModel>
}

export interface SCryfallSets {
  sets: {
    items: Set[],
    pagination: Pagination
  }
}
