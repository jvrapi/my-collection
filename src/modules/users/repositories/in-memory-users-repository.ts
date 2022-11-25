import { User } from "@prisma/client";
import { randomUUID } from 'node:crypto';
import { CreateUser, UpdateUser, UsersRepository } from "./users-repository";

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

  async findByEmailOrUsername(email: string, username: string, id?:string): Promise<User | null> {
    const user = this.users.find( user =>
      (user.email === email && (id ? user.id !== id : true)) 
        || 
      (user.username === username && (id ? user.id !== id : true))
    )
    
    
    if(user){
      return user
    }

    return null

  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id)

    if(user){
      return user
    }

    return null
  }

  async save({id,email,username, name}: UpdateUser): Promise<User>{
    const userIndex = this.users.findIndex(user => user.id === id)

    this.users[userIndex].name = name
    this.users[userIndex].username = username
    this.users[userIndex].email = email
    this.users[userIndex].updatedAt = new Date()

    return this.users[userIndex]
  }
}