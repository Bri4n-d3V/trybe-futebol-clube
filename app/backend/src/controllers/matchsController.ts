import { Request, Response } from 'express';
import Error from '../interfaces/ErrorInterface';
import * as matchsService from '../services/matchsService';

export async function getAllMatchs(req: Request, res: Response): Promise<Response | Error> {
  const { inProgress } = req.query;

  const result = await matchsService.getAllMatchs(inProgress as string);

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}

export async function saveMatch(req: Request, res: Response): Promise<Response | Error> {
  const { authorization } = req.headers;

  const result = await matchsService.saveMatch(req.body, authorization as string);

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}

export async function saveFinishedMatchById(req: Request, res: Response): Promise<Response
| Error> {
  const { id } = req.params;

  const result = await matchsService.saveFinishedMatchById(+id as number);

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}
