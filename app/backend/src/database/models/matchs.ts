import { Model, DataTypes } from 'sequelize';
import db from '.';
import Club from './clubs';

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    field: 'home_team',
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: { model: 'clubs', key: 'id' },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    field: 'away_team',
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: { model: 'clubs', key: 'id' },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'matchs',
  tableName: 'matchs',
  underscored: true,
});

Match.belongsTo(Club, { foreignKey: 'home_team', targetKey: 'id', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'away_team', targetKey: 'id', as: 'awayClub' });

Club.hasMany(Match, { foreignKey: 'home_team', as: 'matchHome' });
Club.hasMany(Match, { foreignKey: 'away_team', as: 'matchAway' });

export default Match;
