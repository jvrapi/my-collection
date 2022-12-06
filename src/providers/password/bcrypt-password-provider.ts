import { compare, hash } from 'bcrypt';
import { PasswordProvider } from './password-provider';

export class BcryptPasswordProvider implements PasswordProvider {
  hashPassword(password: string): Promise<string> {
    return hash(password, 8);
  }

  compare(password: string, passwordEncrypted: string): Promise<boolean> {
    return compare(password, passwordEncrypted);
  }
}
