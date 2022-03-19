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
  const checkToken = await tokenSchema.verifyAuthorization(authorization);
  if (!checkToken) return { status: 401, message: { error: 'Invalid token' } } as Error;

  const homeTeamFilter = await clubsModel.findByPk(body.homeTeam, { raw: true });

  const awayTeamFilter = await clubsModel.findByPk(body.awayTeam, { raw: true });

  if (homeTeamFilter === null || awayTeamFilter === null) {
    return { status: 401,
      message: { message: 'There is no team with such id!' } };
  }

  const match = await matchsModel.create(body, { raw: true });
  const { id, homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = match;

  if (homeTeam === awayTeam) {
    return { status: 401,
      message: { message: 'It is not possible to create a match with two equal teams' } };
  }

  return { status: 201,
    message: { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } };
}

export async function saveFinishedMatchById(id: number): Promise <any> {
  await matchsModel.update({ inProgress: false }, { where: { id } });

  const matchById = await matchsModel.findByPk(id);

  return { status: 200, message: matchById };
}

export async function attMatchById(id: number, homeTeamGoals: number, awayTeamGoals: number)
  : Promise <any> {
  const updateMatch = await matchsModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  console.log('match ==>', updateMatch);

  const matchById = await matchsModel.findByPk(id);

  return { status: 200, message: matchById };
}
