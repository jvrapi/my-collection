import { Request, Response } from "express";
import { AuthenticateUserService } from "./authenticate-user-service";

export class AuthenticateUserController {
  
  constructor(private authenticateUserService: AuthenticateUserService){}

  async handle(request: Request, response: Response) {
    const {username, password} = request.body
    const authenticated = this.authenticateUserService.execute({username, password})
    return authenticated
  }
}