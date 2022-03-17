import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'clubs',
  tableName: 'clubs',
  underscored: true,
});
