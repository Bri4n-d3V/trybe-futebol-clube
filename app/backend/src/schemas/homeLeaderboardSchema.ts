import clubsModel from '../database/models/clubs';

export async function clubMatchs(): Promise<object[]> {
  const clubs: object[] = await clubsModel.findAll();

  const matchsPerClub = await Promise.all(clubs.map(async (club: any):Promise<any> => {
    const temp = await club.getMatchHome();
    const matchs = temp.filter((match: any): boolean => !match.inProgress);

    return { ...club.toJSON(), matchs };
  }));

  const matchsMap = matchsPerClub.map(((item): any => (
    { name: item.clubName, match: item.matchs }
  )));

  return matchsMap;
}

export async function homeTeamsResults(): Promise <object[]> {
  const teams: object[] = await clubMatchs();
  const teamsMap: object[] = teams.map(({ name, match }: any): any => {
    const matchMap = match.map(({ homeTeamGoals, awayTeamGoals }: any): any => {
      let sum = 0;
      if (homeTeamGoals > awayTeamGoals) sum += 3;
      if (homeTeamGoals < awayTeamGoals) sum += 0;
      if (homeTeamGoals === awayTeamGoals) sum += 1;
      return { points: sum, goalsFavor: homeTeamGoals, goalsOwn: awayTeamGoals };
    });
    const obj = { name, matchs: matchMap };
    return obj;
  });
  return teamsMap;
}
