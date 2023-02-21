import {paginator} from "../helpers/pagination";
import {RecoveryCodeModel, UsersModel} from "../db/db";
import {DB_User_Type, RecoveryCodeType, UserType} from "../types";

export const usersRepository = {
    async getUser(sortBy: any, sortDirection: any, pageNumber: number, pageSize: number, searchLoginTerm: any, searchEmailTerm: any) {
        const findAndSortedUser = await UsersModel
            .find({
                $or: [
                    {login: {$regex: searchLoginTerm, $options: "i"}}, {
                        email: {
                            $regex: searchEmailTerm,
                            $options: "i"
                        }
                    }]
            }, {_id: 0, passwordHash: 0, emailConfirmation: 0, __v: 0})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean()
        const getCountUsers = await UsersModel.countDocuments({
            $or: [{
                login: {
                    $regex: searchLoginTerm,
                    $options: "i"
                }
            }, {email: {$regex: searchEmailTerm, $options: "i"}}]
        })
        return paginator(pageNumber, pageSize, getCountUsers, findAndSortedUser)
    },
    async findUserByLoginOrEmail(loginOrEmail: string) {
        return UsersModel.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]})
    },
    async findUserByEmail(email: string) {
        return UsersModel.findOne({email})
    },
    async findUserByID(id: string): Promise<DB_User_Type | null> {
        return UsersModel.findOne({id})
    },
    async findUserByCode(code: string) {
        return UsersModel.findOne({'emailConfirmation.confirmationCode': code})
    },
    async createUser(newUser: DB_User_Type | any): Promise<UserType> {
        const result = await UsersModel.insertMany(newUser)
        const {_id, passwordHash, emailConfirmation, ...newUserCopy} = newUser
        return newUserCopy
    },
    async updateUserConfirmationDate(user: DB_User_Type) {
        const updateUser = await UsersModel.updateOne({id: user.id}, {
            $set:
                {
                    'emailConfirmation.confirmationCode': user.emailConfirmation.confirmationCode,
                    'emailConfirmation.expirationDate': user.emailConfirmation.expirationDate,
                    'emailConfirmation.isConfirmed': user.emailConfirmation.isConfirmed
                }
        })
        return updateUser.matchedCount === 1
    },
    async updateUserConfirmation(id: string) {
        const updateUser = await UsersModel.updateOne({id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return updateUser.matchedCount === 1
    },
    async deleteUser(id: string): Promise<boolean> {
        const result = await UsersModel.deleteOne({id})
        return result.deletedCount === 1
    },
    async addRecoveryUserCode(recoveryCode: RecoveryCodeType) {
        return RecoveryCodeModel.insertMany(recoveryCode)
    }
}