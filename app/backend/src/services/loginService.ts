import { sign } from 'jsonwebtoken';
import Error from '../interfaces/ErrorInterface';
import { verifyToken, verifyAuthorization } from '../schemas/tokenSchema';
import verifyPassword from '../schemas/loginSchema';
import userModel from '../database/models/users';

export async function createLogin(email: string, password: string): Promise<any> {
  if (!email || !password) {
    return { status: 401, message: { message: 'All fields must be filled' } } as Error;
  }

  const user = await userModel.findOne({ where: { email }, raw: true });
  if (!user) return { status: 401, message: { message: 'Incorrect email or password' } };

  const checkLogin = await verifyPassword(password, user?.password as string);
  if (checkLogin) return checkLogin as Error;

  const { id, username, role } = user;

  const token = sign(role, 'SENHA', { algorithm: 'HS256' });

  const checkToken = await verifyToken(token);
  if (checkToken) return checkToken as Error;

  return {
    status: 200,
    message: {
      user: { id, username, role, email },
      token,
    },
  };
}

export async function loginValidate(authorization: string): Promise<any> {
  const checkToken = await verifyAuthorization(authorization);

  const { payload } = checkToken;

  if (!checkToken) return { status: 401, message: { error: 'Invalid token' } } as Error;

  return {
    status: 200,
    message: payload,
  };
}
