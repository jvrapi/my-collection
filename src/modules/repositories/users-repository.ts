export interface CreateUser{
  name: string
  email: string
  username: string
  password: string
}

export type User = CreateUser & {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface UsersRepository {
  findByEmailOrUsername(email: string, username: string): Promise<User[]>
  create(user: CreateUser): Promise<User>
}