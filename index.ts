import express, { Express } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServer } from '@apollo/server';
import resolvers from './resolvers';
import { typeDefs } from './schema';
dotenv.config();
const app: Express = express();
const port = process.env.SERVER_PORT || 5000;
const origin = process.env.CLIENT_URL || "http://localhost:3000"





const bootStrapServer = async () => {
	const server = new ApolloServer({ typeDefs, resolvers })
	try {
		await server.start()
		app.use(cors({ origin: [origin as string] }))
		app.use(express.json())
		app.use(express.urlencoded({ extended: false }))


		app.use('/graphql', expressMiddleware(server, {
			context: async ({ req, res }) => {
				const token = req.headers.authorization
				return { token }
			}
		}))

		app.get('/', (req, res) => {
			res.send("Hello World")
		})

		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(port, () => {
			console.log("database is running ...")
			console.log("server is running ...")
		})
	} catch (err) {
		console.error(err)
	}
}

bootStrapServer()