import { Request, Response } from 'express';
import Error from '../interfaces/ErrorInterface';
import getlAllMatchs from '../services/matchsService';

export default async function getAllMatchs(req: Request, res: Response): Promise<Response | Error> {
  const { inProgress } = req.query;

  const result = await getlAllMatchs(inProgress as string);

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}
