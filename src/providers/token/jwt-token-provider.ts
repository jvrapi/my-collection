import { sign, verify } from 'jsonwebtoken';
import {
  CheckToken, GenerateToken, TokenPayload, TokenProvider,
} from './token-provider';

export class JwtTokenProvider implements TokenProvider {
  private tokenSecret: string;

  private tokenExpiration: string;

  constructor() {
    this.tokenSecret = process.env.TOKEN_SECRET as string;
    this.tokenExpiration = process.env.TOKEN_EXPIRATION as string;
  }

  generateToken({ userId }: GenerateToken): string {
    const token = sign({}, this.tokenSecret, {
      subject: userId,
      expiresIn: this.tokenExpiration,
    });

    return token;
  }

  checkToken({ token }: CheckToken): string {
    const { sub: userId } = verify(
      token,
      this.tokenSecret,
    ) as TokenPayload;

    return userId;
  }
}
