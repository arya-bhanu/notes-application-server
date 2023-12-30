import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const UserModel = sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{ freezeTableName: true }
);
export default UserModel;
