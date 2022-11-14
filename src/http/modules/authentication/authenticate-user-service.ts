interface AuthenticateUserRequest {
  username: string,
  password: string
}

export class AuthenticateUserService {
  async execute({}: AuthenticateUserRequest){}
}