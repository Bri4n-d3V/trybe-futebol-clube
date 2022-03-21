import { Request, Response } from 'express';
import Error from '../interfaces/ErrorInterface';
import * as leaderboardService from '../services/leaderboardService';

export async function getHomeLeaderboard(req: Request, res: Response)
  :Promise <Response | Error > {
  const result = await leaderboardService.getHomeLeaderboard();

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}

export async function getAwayLeaderboard(req: Request, res: Response)
  :Promise <Response | Error > {
  const result = await leaderboardService.getAwayLeaderboard();

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}

export async function getAllLeaderboard(req: Request, res: Response)
  :Promise <Response | Error > {
  const result = await leaderboardService.getAllLeaderboard();

  if ((result as Error).status) {
    return res.status((result as Error).status)
      .json((result as Error).message);
  }

  return res.status(result.status).json(result.message) as Response;
}
