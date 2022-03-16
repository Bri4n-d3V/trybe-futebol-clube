import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Club extends Model {
  static assoaciate(models: any) {
    Club.hasMany(models.Match, { foreignKey: 'id', as: 'matchs' });
  }
}

Club.init({
  club_name: DataTypes.STRING,
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'clubs',
  tableName: 'clubs',
});
