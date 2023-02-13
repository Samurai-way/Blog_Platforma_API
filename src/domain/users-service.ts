import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";

export type DB_User_Type = {
    _id: ObjectId,
    userName: string,
    passwordHash: string
    passwordSalt: string
    email: string,
    createAt: Date

}
export const usersService = {
    async createUser(login: string, password: string, email: string) {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generationHash(password, passwordSalt)
        const newUser: DB_User_Type = {
            _id: new ObjectId(),
            userName: login,
            email,
            passwordHash,
            passwordSalt,
            createAt: new Date()
        }
    },
    async _generationHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        console.log('hash', +hash)
        return hash
    }
}