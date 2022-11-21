import { User } from "@prisma/client";
import { prisma } from "../../../database/prisma";
import { CreateUser, UsersRepository } from "./users-repository";

export class PrismaUsersRepository implements UsersRepository {
   
  
  findByEmailOrUsername(email?: string, username?: string): Promise<User | null> {
    return  prisma.user.findFirst({
    where: {
      OR: [
        {
          email: {
            equals: email
          }
        },
        {
          username: {
            contains: username?.toLowerCase()
          }
        }
      ]
    }
   })
    
  }


  create(user: CreateUser): Promise<User> {
    return prisma.user.create({
      data: user,
    })
  }

}


