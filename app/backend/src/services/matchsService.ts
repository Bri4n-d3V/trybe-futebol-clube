import matchsModel from '../database/models/matchs';
import clubsModel from '../database/models/clubs';

export default async function getAllMatchs(inProgress: string | undefined): Promise<any> {
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
