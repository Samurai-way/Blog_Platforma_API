import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";
import {DB_User_Type, UserType} from "../db/db";
import {usersRepository} from "../repositories/users-db-repository";



export const usersService = {
    async createUser(login: string, password: string, email: string): Promise<UserType> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generationHash(password, passwordSalt)

        const newUser: DB_User_Type = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            login,
            email,
            passwordHash,
            passwordSalt,
            createAt: new Date().toISOString()
        }
        return usersRepository.createUser(newUser)
    },
    async _generationHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        console.log('hash', +hash)
        return hash
    }
}