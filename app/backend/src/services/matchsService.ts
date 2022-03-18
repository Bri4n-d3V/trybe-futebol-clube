import Error from '../interfaces/ErrorInterface';
import matchsModel from '../database/models/matchs';
import clubsModel from '../database/models/clubs';
import * as tokenSchema from '../schemas/tokenSchema';

export async function getAllMatchs(inProgress: string | undefined): Promise<any> {
  if (inProgress) {
    const matchsInProgress = await matchsModel.findAll(
      { where: { in_progress: inProgress === 'true' },
        attributes: { exclude: ['home_team', 'away_team'] },
        include: [{ model: clubsModel, as: 'homeClub', attributes: ['clubName'] },
          { model: clubsModel, as: 'awayClub', attributes: ['clubName'] }] },
    );
    return { status: 200, message: matchsInProgress };
  }

  const matchs = await matchsModel.findAll(
    { attributes: { exclude: ['home_team', 'away_team'] },
      include: [{ model: clubsModel, as: 'homeClub', attributes: ['clubName'] },
        { model: clubsModel, as: 'awayClub', attributes: ['clubName'] }] },
  );
  return { status: 200, message: matchs };
}

export async function saveMatch(body: any, authorization: string): Promise <any | Error> {
  const match = await matchsModel.create(body, { raw: true });

  const { id, homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;

  const checkToken = await tokenSchema.verifyAuthorization(authorization);

  if (!checkToken) return { status: 401, message: { error: 'Invalid token' } } as Error;

  return { status: 201,
    message: {
      id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress,
    } };
}

export async function saveFinishedMatchById(id: number): Promise <any> {
  await matchsModel.update({ inProgress: false }, { where: { id } });

  const matchById = await matchsModel.findByPk(id);
  console.log('matchById ==>', matchById);

  return { status: 200, message: matchById };
}
