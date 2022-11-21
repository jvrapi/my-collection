import { User } from "@prisma/client"
import { Optional } from "../../../types/partial"

export interface CreateUser{
  name: string
  email: string
  username: string
  password: string
}

export type UserCreated = Optional<User, 'password'> 


export interface UsersRepository {
  findByEmailOrUsername(email?: string, username?: string): Promise<User | null>
  create(user: CreateUser): Promise<UserCreated>
}