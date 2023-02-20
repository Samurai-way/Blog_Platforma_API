import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";
import {DB_User_Type, UserType} from "../db/db";
import {usersRepository} from "../repositories/users-db-repository";
import {v4 as uuidv4} from 'uuid'
import add from 'date-fns/add'
import {emailService} from "./email-service";
import {jwtService} from "../application/jwt-service";
import {userSessionService} from "./userSession-service";

export const usersService = {
    async getUser(sortBy: any, sortDirection: any, pageNumber: number, pageSize: number, searchLoginTerm: any, searchEmailTerm: any) {
        return usersRepository.getUser(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
    },
    async checkCredentials(loginOrEmail: string, password: string) { // DB_User_Type fix any type
        const findUserByLoginOrEmail = await usersRepository.findUserByLoginOrEmail(loginOrEmail)
        if (!findUserByLoginOrEmail) return null
        const value = await bcrypt.compare(password, findUserByLoginOrEmail.passwordHash);
        if (!value) return null
        return findUserByLoginOrEmail
    },
    async loginUser(loginOrEmail: string, password: string, ip: string, title: string) {
        const findUserByLoginOrEmail = await usersRepository.findUserByLoginOrEmail(loginOrEmail)
        if (!findUserByLoginOrEmail) return false
        const passwordSalt = findUserByLoginOrEmail.passwordHash.slice(0, 29)
        const passwordHash = await bcrypt.hash(password, passwordSalt)
        const checkCredentials = await usersRepository.loginUser(loginOrEmail, passwordHash)
        if (!checkCredentials) return false

        const deviceId = new ObjectId().toString()
        const createJWT = jwtService.createJWT(checkCredentials.id as any, deviceId)
        await userSessionService.createNewUserSession(ip, title, deviceId, findUserByLoginOrEmail, createJWT)
        return createJWT
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
            const bodyTextMessage = `<h1>Thank for your registration</h1>
       <p>To finish registration please follow the link below:
          <a href='https://somesite.com/confirm-email?code=${newUser.emailConfirmation.confirmationCode}'>complete registration</a>
      </p>`
            // `https://somesite.com/confirm-email?code=${newUser.emailConfirmation.confirmationCode}`
            await emailService.sendEmail(email, "confirm code", bodyTextMessage)
        } catch (error) {
            console.log(error)
            return null
        }
        return result
    },
    async findUserByEmail(email: string): Promise<any> {
        return await usersRepository.findUserByEmail(email)
    },
    async findUserByLogin(login: string) {
        return await usersRepository.findUserByLoginOrEmail(login)
    },
    async deleteUser(id: string): Promise<boolean> {
        return await usersRepository.deleteUser(id)
    },
    async confirmEmail(code: string, user: DB_User_Type) {
        if (user.emailConfirmation.expirationDate > new Date() && !user.emailConfirmation.isConfirmed) {
            const result = usersRepository.updateUserConfirmation(user.id)
            return result
            // console.log('result', result)
        }
    },
    async findUserByCode(code: string): Promise<DB_User_Type | any> {
        return await usersRepository.findUserByCode(code)
    },
    async _generationHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
}