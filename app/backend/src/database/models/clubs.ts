import { Model, DataTypes } from 'sequelize';
import db from '.';

class Club extends Model {
}

Club.init({
  club_name: DataTypes.STRING,
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'clubs',
  tableName: 'clubs',
});
