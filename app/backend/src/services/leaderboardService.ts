import * as homeLeaderboardSchema from '../schemas/homeLeaderboardSchema';
import * as awayLeaderboardSchema from '../schemas/awayLeaderboardSchema';
import * as allLeaderboardSchema from '../schemas/allLeaderboardSchema';

export async function getHomeLeaderboard(): Promise<any | Error> {
  const temp = await homeLeaderboardSchema.homeTeamsResults();
  const result = await allLeaderboardSchema.ultimateTeamResults(temp);

  return { status: 200, message: result };
}

export async function getAwayLeaderboard(): Promise<any | Error> {
  const temp = await awayLeaderboardSchema.awayTeamsResults();
  const result = await allLeaderboardSchema.ultimateTeamResults(temp);

  return { status: 200, message: result };
}

export async function getAllLeaderboard(): Promise<any | Error> {
  const temp = await allLeaderboardSchema.concateMatchs();
  const result = await allLeaderboardSchema.ultimateTeamResults(temp);

  return { status: 200, message: result };
}
