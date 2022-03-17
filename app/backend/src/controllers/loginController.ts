import { Request, Response } from 'express';
import Error from '../interfaces/ErrorInterface';
import * as loginService from '../services/loginService';
import Login from '../interfaces/loginInterface';

export async function createLogin(req: Request, res: Response): Promise<Response> {
  const reqBody: Login = req.body;

  const { email, password } = reqBody;

  const result = await loginService.createLogin(email, password);

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}

export async function loginValidate(req: Request, res: Response): Promise<Response> {
  const { authorization } = req.headers;

  const result = await loginService.loginValidate(authorization as string);

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}
