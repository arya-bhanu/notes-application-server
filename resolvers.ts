import bcrypt from 'bcrypt'
import UserModel from "./models/User.model"
import jsonwebtoken from 'jsonwebtoken'
import authenticate from "./middleware/authenticate.middleware"
import { authorizeUser } from "./middleware/authorize.middleware"
import NoteModel from "./models/Note.model"
const resolvers = {
    Query: {
        async getAllNotes(_: any, input: any, context: any) {
            try {
                // security bypass
                const auth = authenticate(context)
                console.log(auth)
                if (auth) {
                    const { id, username } = auth
                    if (!await authorizeUser(id)) {
                        throw new Error("Unauthorized")
                    }
                    console.log(id)
                    // business logic
                    const notes = await NoteModel.findAll({ where: { userId: id } })
                    return notes
                }

            } catch (err) {
                console.error(err)
                throw err
            }
        }
        ,
        async getNote(_: any, { id: noteId }: { id: string }, context: any) {
            try {
                // security bypass
                const auth = authenticate(context)
                console.log(auth)
                if (auth) {
                    const { id, username } = auth
                    if (!await authorizeUser(id)) {
                        throw new Error("Unauthorized")
                    }
                    // business logic
                    const note = await NoteModel.findByPk(noteId)
                    return note
                }

            } catch (err) {
                console.error(err)
                throw err
            }
        }
    },
    Mutation: {
        async addUser(_: any, { input }: { input: any }) {
            try {
                const salt = bcrypt.genSaltSync()
                const cryptedPass = bcrypt.hashSync(input.password, salt)
                await UserModel.create({ username: input.username, password: cryptedPass })
                return true
            } catch (err) {
                console.error(err)
                throw Error("internal server error")
            }

        }
        ,
        async loginUser(_: any, { input }: { input: any }) {
            try {
                const user = await UserModel.findOne({ where: { username: input.username } })
                if (!user) throw Error("user not found")
                const validPassword = bcrypt.compareSync(input.password, await user.getDataValue("password"))
                if (validPassword) {
                    const token = jsonwebtoken.sign({ username: await user.getDataValue("username"), id: await user.getDataValue("id") }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' })
                    return token
                }
                throw Error("invalid password")
            } catch (err) {
                console.error(err)
                throw Error("internal server error")
            }
        }
        ,
        async addNote(_: any, { input }: { input: any }, context: any) {
            try {
                // security bypass
                const auth = authenticate(context)
                if (auth) {
                    const { id, username } = auth
                    if (!await authorizeUser(id)) {
                        throw new Error("Unauthorized")
                    }
                    // business logic
                    const { title, body } = input
                    await NoteModel.create({ title, body, userId: id })
                    return true
                }
            } catch (err) {
                console.error(err)
                throw err
            }
        },
        async deleteNote(_: any, { input }: { input: any }, context: any) {
            try {
                // security bypass
                const auth = authenticate(context)
                if (auth) {
                    const { id, username } = auth
                    if (!await authorizeUser(id)) {
                        throw new Error("Unauthorized")
                    }
                    // business logic
                    const noteId = input
                    const deleted = await NoteModel.destroy({ where: { id: noteId } })
                    if (deleted <= 0) {
                        throw new Error("No data is found. No data deleted")
                    }
                    return true
                }
            } catch (err) {
                console.error(err)
                throw err
            }
        },
        async updateNote(_: any, { input }: { input: any }, context: any) {
            try {
                // security bypass
                const auth = authenticate(context)
                if (auth) {
                    const { id, username } = auth
                    if (!await authorizeUser(id)) {
                        throw new Error("Unauthorized")
                    }
                    // business logic
                    const { title, body, noteId } = input
                    const [updated] = await NoteModel.update({ title, body }, { where: { id: noteId } })
                    if (updated <= 0) {
                        throw new Error("No data is found. No data updated")
                    }
                    return true
                }
            } catch (err) {
                console.error(err)
                throw err
            }
        }

    }
}

export default resolvers