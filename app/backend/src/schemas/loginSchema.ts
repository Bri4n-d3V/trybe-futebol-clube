import * as bcrypt from 'bcryptjs';
import Error from '../interfaces/ErrorInterface';

export default async function verifyPassword(password: string, hash:string)
  : Promise<Error | void> {
  const result = await bcrypt.compare(password, hash);

  if (!result) {
    return { status: 401, message: { message: 'Incorrect email or password' } } as Error;
  }
}
