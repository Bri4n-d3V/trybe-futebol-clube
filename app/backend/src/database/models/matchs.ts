import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Match extends Model {
  static associate(models: any) {
    this.belongsTo(models.Club, { foreignKey: 'id', as: 'clubs' });
  }
}

Match.init({
  home_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: { model: 'clubs', key: 'id' },
  },
  home_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: { model: 'clubs', key: 'id' },
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  in_progress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'matchs',
  tableName: 'matchs',
});
