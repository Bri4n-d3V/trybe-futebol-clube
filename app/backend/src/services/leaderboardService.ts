// import clubsModel from '../database/models/clubs';
// import matchsModel from '../database/models/matchs';
import * as leaderboardSchema from '../schemas/leaderboardSchema';

export default async function getLeaderboard(): Promise<any | Error> {
  const result = await leaderboardSchema.ultimateHomeTeamResults();

  return { status: 200, message: result };
}
