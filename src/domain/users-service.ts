import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";
import {DB_User_Type, UserType} from "../db/db";
import {usersRepository} from "../repositories/users-db-repository";


export const usersService = {
    async getUser(sortBy: any, sortDirection: any, pageNumber: number, pageSize: number, searchLoginTerm: any, searchEmailTerm: any) {
        return usersRepository.getUser(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
    },
    async checkCredentials(loginOrEmail: string, password: string): Promise<DB_User_Type | null> {
        const user = await usersRepository.findUserByLoginOrEmail(loginOrEmail)
        if (!user) return null
        const value = await bcrypt.compare(password, user.passwordHash);
        if (!value) return null
        return user
    },
    async createUser(login: string, password: string, email: string): Promise<UserType> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generationHash(password, passwordSalt)

        const newUser: DB_User_Type = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            login,
            email,
            passwordHash,
            createdAt: new Date().toISOString()
        }
        return usersRepository.createUser(newUser)
    },
    async deleteUser(id: string): Promise<boolean> {
        return await usersRepository.deleteUser(id)
    },
    async _generationHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
}