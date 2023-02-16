import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";
import {DB_User_Type, UserType} from "../db/db";
import {usersRepository} from "../repositories/users-db-repository";
import {v4 as uuidv4} from 'uuid'
import add from 'date-fns/add'
import {emailService} from "./email-service";

export const usersService = {
    async getUser(sortBy: any, sortDirection: any, pageNumber: number, pageSize: number, searchLoginTerm: any, searchEmailTerm: any) {
        return usersRepository.getUser(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
    },
    async checkCredentials(loginOrEmail: string, password: string): Promise<any | null> { // DB_User_Type fix any type
        const user = await usersRepository.findUserByLoginOrEmail(loginOrEmail)
        if (!user) return null
        const value = await bcrypt.compare(password, user.passwordHash);
        if (!value) return null
        return user
    },
    async createUser(login: string, password: string, email: string): Promise<UserType | null> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generationHash(password, passwordSalt)

        const code = uuidv4()

        const newUser: DB_User_Type = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            login,
            email,
            passwordHash,
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                confirmationCode: code,
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: false
            }
        }
        const result = await usersRepository.createUser(newUser)
        try {
            const bodyTextMessage = `https://somesite.com/confirm-email?code=${newUser.emailConfirmation.confirmationCode}`
            await emailService.sendEmail(email, "confirm code", bodyTextMessage)
        } catch (error) {
            console.log(error)
            return null
        }
        return result
    },
    async deleteUser(id: string): Promise<boolean> {
        return await usersRepository.deleteUser(id)
    },
    // async confirmEmail(code: string) {
    //
    // },
    async findUserByCode(code: string): Promise<DB_User_Type | any> {
        return await usersRepository.findUserByCode(code)
    },
    async _generationHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
}