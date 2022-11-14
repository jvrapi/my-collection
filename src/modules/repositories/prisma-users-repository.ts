import { prisma } from "../../prisma";
import { CreateUser, User, UsersRepository } from "./users-repository";

export class PrismaUsersRepository implements UsersRepository {
   
  
   findByEmailOrUsername(email: string, username: string): Promise<User[]> {
   return  prisma.user.findMany({
    where: {
      OR: [
        {
          email: {
            equals: email
          }
        },
        {
          username: {
            contains: username.toLowerCase()
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


