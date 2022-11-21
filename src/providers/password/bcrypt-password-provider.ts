import { compare, hash } from 'bcrypt';
import { PasswordProvider } from "./password-provider";
export class BcryptPasswordProvider implements PasswordProvider{
  
  hashPassword(password: string): Promise<string> {
    return hash(password, 8)
  }

  compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash)
  }

}