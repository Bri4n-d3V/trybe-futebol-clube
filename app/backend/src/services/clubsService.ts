import clubsModel from '../database/models/clubs';

export async function getAllClubs(): Promise <any> {
  const clubs = await clubsModel.findAll({ raw: true });

  return { status: 200, message: clubs };
}

export async function getClubById(id: number): Promise <any> {
  const club = await clubsModel.findByPk(id);

  return { status: 200, message: club };
}
