import { Request, Response } from 'express';
import Error from '../interfaces/ErrorInterface';
import leaderboardService from '../services/leaderboardService';

export default async function getLeaderboard(req: Request, res: Response)
  :Promise <Response | Error > {
  const result = await leaderboardService();

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}
