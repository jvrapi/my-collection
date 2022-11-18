import { User } from "@prisma/client";
import { CreateUser, UsersRepository } from "./users-repository";
import {randomUUID} from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository{
  
  private users: User[] = []
   
  async create({email, name,password,username}: CreateUser): Promise<User> {
    const id = randomUUID() 
    const user: User = {
      email,
      name,
      username,
      password,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.users.push(user)

    return user
  }

  async findByEmailOrUsername(email: string, username: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email || user.username === username)
    
    
    if(user){
      return user
    }

    return null

  }
}