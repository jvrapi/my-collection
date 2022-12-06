import { User } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { CreateUser, UpdateUser, UsersRepository } from './users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async create({
    email, name, password, username,
  }: CreateUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      email,
      name,
      username,
      password,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async save({
    id, email, username, name,
  }: UpdateUser): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    this.users[userIndex].name = name;
    this.users[userIndex].username = username;
    this.users[userIndex].email = email;
    this.users[userIndex].updatedAt = new Date();

    return this.users[userIndex];
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username) || null;
  }
}
