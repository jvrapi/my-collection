import crypto from 'node:crypto';
import { JwtTokenProvider } from './jwt-token-provider';
import { TokenProvider } from './token-provider';

describe('[unit] Token provider', () => {
  let tokenProvider: TokenProvider;

  beforeEach(() => {
    tokenProvider = new JwtTokenProvider();
  });

  it('should be able to generate a new token', () => {
    const userId = crypto.randomUUID();
    const token = tokenProvider.generateToken({ userId });
    expect(token).toBeDefined();
  });

  it('should be able to check a token', () => {
    const userId = crypto.randomUUID();
    const token = tokenProvider.generateToken({ userId });
    const tokenUserId = tokenProvider.checkToken({ token });
    expect(tokenUserId).toBe(tokenUserId);
  });
});
