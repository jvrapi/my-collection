import { BcryptPasswordProvider } from './bcrypt-password-provider';
import { PasswordProvider } from './password-provider';

describe('Password provider', () => {
  let passwordProvider: PasswordProvider;
  const password = 'ncDeyTOapY';

  beforeEach(() => {
    passwordProvider = new BcryptPasswordProvider();
  });

  it('should be able to crypt a password', async () => {
    const encryptedPassword = await passwordProvider.hashPassword(password);

    expect(typeof encryptedPassword).toBe('string');
    expect(encryptedPassword.length).toBeGreaterThanOrEqual(60);
  });

  it('should be able to compare a password with an hash', async () => {
    const encryptedPassword = await passwordProvider.hashPassword(password);
    const correctPassword = await passwordProvider.compare(password, encryptedPassword);
    const wrongPassword = await passwordProvider.compare('wrongPassword', encryptedPassword);
    expect(typeof correctPassword).toBe('boolean');
    expect(typeof wrongPassword).toBe('boolean');
    expect(correctPassword).toBeTruthy();
    expect(wrongPassword).not.toBeTruthy();
  });
});
