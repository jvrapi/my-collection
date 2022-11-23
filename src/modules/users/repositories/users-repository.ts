import { User } from "@prisma/client"
import { Optional } from "../../../types/partial"

export interface CreateUser{
  name: string
  email: string
  username: string
  password: string
}

export interface UpdateUser {
  id: string
  name: string
  email: string
  username: string
}

export type UserCreated = Optional<User, 'password'> 


export interface UsersRepository {
  findByEmailOrUsername(email?: string, username?: string, id?: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(user: CreateUser): Promise<UserCreated>
  save(user: UpdateUser): Promise<User>
}