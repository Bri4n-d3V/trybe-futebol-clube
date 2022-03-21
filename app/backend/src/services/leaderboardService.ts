import * as homeLeaderboardSchema from '../schemas/homeLeaderboardSchema';
import * as awayLeaderboardSchema from '../schemas/awayLeaderboardSchema';

export async function getHomeLeaderboard(): Promise<any | Error> {
  const result = await homeLeaderboardSchema.ultimateHomeTeamResults();

  return { status: 200, message: result };
}

export async function getAwayLeaderboard(): Promise<any | Error> {
  const result = await awayLeaderboardSchema.ultimateAwayTeamResults();

  return { status: 200, message: result };
}
