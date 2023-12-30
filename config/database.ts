import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(
	DB_NAME as string,
	DB_USERNAME as string,
	DB_PASSWORD,
	{
		host: DB_HOST,
		dialect: 'postgres',
		port: Number(DB_PORT),
	}
);

export default sequelize;
