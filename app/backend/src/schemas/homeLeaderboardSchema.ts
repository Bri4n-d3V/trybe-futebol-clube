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

// 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols contra.
export function sortHomeTeams(table: any):Promise<any> {
  return table.sort((a:any, b:any): any => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
    if (b.goalsOwn !== a.goalsOwn) return b.goalsOwn - a.goalsOwn;
    return 0;
  });
}

export async function ultimateHomeTeamResults(): Promise<any> {
  const results: any = await homeTeamsResults();

  const matchsItem = results.map((club: any):any => {
    const obj = {
      name: club.name,
      totalPoints: club.matchs.reduce((acc: number, item: any): number => (acc + item.points), 0),
      totalGames: club.matchs.length,
      totalVictories: club.matchs.filter((item: any):boolean => item.points === 3).length,
      totalDraws: club.matchs.filter((item: any):boolean => item.points === 1).length,
      totalLosses: club.matchs.filter((item: any):boolean => item.points === 0).length,
      goalsFavor: club.matchs.reduce((ac: number, item: any): number => (ac + item.goalsFavor), 0),
      goalsOwn: club.matchs.reduce((ac: number, item: any): number => (ac + item.goalsOwn), 0),
      goalsBalance: 0,
      efficiency: 0 };
    obj.goalsBalance = obj.goalsFavor - obj.goalsOwn;
    obj.efficiency = Math.round((obj.totalPoints / (obj.totalGames * 3)) * 10000) / 100;
    return obj;
  });
  return sortHomeTeams(matchsItem);
}
