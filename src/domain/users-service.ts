import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from 'uuid'
import add from 'date-fns/add'

import {DB_User_Type, RecoveryCodeType, UserType} from "../types";
import {UsersRepository} from "../repositories/users-db-repository";
import {emailService} from "../compositions/emailComposition";

export class UsersService {
    constructor(protected usersRepository: UsersRepository) {
    }

    async getUser(sortBy: any, sortDirection: any, pageNumber: number, pageSize: number, searchLoginTerm: any, searchEmailTerm: any) {
        return this.usersRepository.getUser(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
    }

    async checkUserCredentials(loginOrEmail: string, password: string) {
        const user = await this.usersRepository.findUserByLoginOrEmail(loginOrEmail)
        if (!user) return null
        const isPasswordsMatch = await bcrypt.compare(password, user.passwordHash)
        if (!isPasswordsMatch) return null
        return user
    }

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
        const result = await this.usersRepository.createUser(newUser)
        try {
            const bodyTextMessage = `<h1>Thank for your registration</h1>
       <p>To finish registration please follow the link below:
          <a href='https://somesite.com/confirm-email?code=${newUser.emailConfirmation.confirmationCode}'>complete registration</a>
      </p>`
            await emailService.sendEmail(email, "confirm code", bodyTextMessage)
        } catch (error) {
            console.log(error)
            return null
        }
        return result
    }

    async findUserByEmail(email: string) {
        return this.usersRepository.findUserByEmail(email)
    }

    async findUserByEmailAndSendHimLetter(email: string) {
        const recoveryCode: RecoveryCodeType = {
            email: email,
            recoveryCode: uuidv4()
        }
        const result = await this.usersRepository.addRecoveryUserCode(recoveryCode)
        try {
            const message = `<h1>Password recovery</h1>
       <p>To finish password recovery please follow the link below:
          <a href='https://somesite.com/password-recovery?recoveryCode=${recoveryCode.recoveryCode}'>recovery password</a>
      </p>`
            await emailService.sendEmail(email, "recovery code", message)
        } catch (error) {
            console.log(error)
            return null
        }
        return result
    }

    async findUserByLogin(login: string) {
        return this.usersRepository.findUserByLoginOrEmail(login)
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.usersRepository.deleteUser(id)
    }

    async confirmEmail(code: string, user: DB_User_Type) {
        if (user.emailConfirmation.expirationDate > new Date() && !user.emailConfirmation.isConfirmed) {
            const result = this.usersRepository.updateUserConfirmation(user.id)
            return result
        }
    }

    async findUserByCode(code: string): Promise<DB_User_Type | any> {
        console.log('code', code)
        return this.usersRepository.findUserByCode(code)
    }

    async _generationHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }

    async findUserRecoveryCodeAndChangeNewPassword(newPassword: string, recoveryCode: string) {
        const findUserRecoveryCode = await this.usersRepository.findUserByRecoveryCode(recoveryCode)
        if (!findUserRecoveryCode) return null
        const passwordSalt = await bcrypt.genSalt(10)
        const hash = await this._generationHash(newPassword, passwordSalt)
        const updateUserHash = await this.usersRepository.updateUserHash(findUserRecoveryCode.email, hash)
        return updateUserHash
    }
}

