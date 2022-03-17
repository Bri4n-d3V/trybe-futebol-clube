import { verify, decode } from 'jsonwebtoken';
import Error from '../interfaces/ErrorInterface';

export async function verifyToken(token: string): Promise<Error | any> {
  try {
    await verify(token, 'super_senha');
  } catch (error) {
    return { status: 401, message: { error: 'Invalid token' } } as Error;
  }
}

export async function verifyAuthorization(authorization: string): Promise<Error | any> {
  try {
    await verify(authorization, 'super_senha');
    return decode(authorization, { complete: true });
  } catch (error) {
    return false;
  }
}
