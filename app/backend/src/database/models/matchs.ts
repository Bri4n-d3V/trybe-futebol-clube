import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
}

Match.init({
  home_team: DataTypes.INTEGER,
  home_team_goals: DataTypes.INTEGER,
  away_team: DataTypes.INTEGER,
  away_team_goals: DataTypes.INTEGER,
  in_progress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'matchs',
  tableName: 'matchs',
});
