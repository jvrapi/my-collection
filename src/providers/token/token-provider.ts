export interface GenerateToken {
  userId: string
}

export interface CheckToken {
  token: string
}

export interface TokenPayload {
  sub: string
}

export interface TokenProvider {
  generateToken({ userId }: GenerateToken): string
  checkToken({ token }: CheckToken): string
}
