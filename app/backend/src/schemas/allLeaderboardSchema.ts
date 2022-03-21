import * as homeSchema from './homeLeaderboardSchema';
import * as awaySchema from './awayLeaderboardSchema';

// 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols contra.
export function sortTeams(table: any):Promise<any> {
  return table.sort((a:any, b:any): any => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
    if (b.goalsOwn !== a.goalsOwn) return b.goalsOwn - a.goalsOwn;
    return 0;
  });
}

export async function ultimateTeamResults(results: any): Promise<any> {
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
  return sortTeams(matchsItem);
}

export async function concateMatchs():Promise <any> {
  const homeTemp = await homeSchema.homeTeamsResults();
  const awayTemp = await awaySchema.awayTeamsResults();

  const allMatchs = homeTemp.map((item: any):{ name: any, matchs: any[] } => {
    const awayResult = awayTemp.find((element: any): boolean =>
      element.name === item.name) || { matchs: [] } as any;

    return { name: item.name, matchs: [...item.matchs, ...awayResult.matchs] };
  });

  return allMatchs;
}
