import UserModel from "../models/User.model"

const authorizeUser = async (id: string) => {
    try {
        const user = await UserModel.findByPk(id)
        if (!user) return false
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

export { authorizeUser }