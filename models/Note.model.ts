import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import UserModel from './User.model';

const NoteModel = sequelize.define(
	'note',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		title: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		body: {
			type: DataTypes.STRING,
			allowNull: false
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{ freezeTableName: true }
);
UserModel.hasMany(NoteModel)
NoteModel.belongsTo(UserModel)
export default NoteModel