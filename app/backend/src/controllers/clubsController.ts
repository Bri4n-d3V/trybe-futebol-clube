import { Request, Response } from 'express';
import Error from '../interfaces/ErrorInterface';
import * as clubService from '../services/clubsService';

export async function getAllClubs(req: Request, res: Response): Promise<Response | Error> {
  const result = await clubService.getAllClubs();

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}

export async function getClubById(req: Request, res: Response): Promise<Response | Error> {
  const { id } = req.params;

  const result = await clubService.getClubById(+id);

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}
