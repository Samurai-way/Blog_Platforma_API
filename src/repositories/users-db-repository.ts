import {DB_User_Type, usersCollection, UserType} from "../db/db";
import {paginator} from "../helpers/pagination";

export const usersRepository = {
    async getUser(sortBy: any, sortDirection: any, pageNumber: number, pageSize: number, searchLoginTerm: any, searchEmailTerm: any) {
        const findAndSortedUser = await usersCollection
            .find({
                $or: [
                    {login: {$regex: searchLoginTerm, $options: "i"}}, {
                        email: {
                            $regex: searchEmailTerm,
                            $options: "i"
                        }
                    }]
            }, {projection: {_id: 0, passwordHash: 0, emailConfirmation: 0}})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        // console.log('findAndSortedUser',findAndSortedUser)
        const getCountUsers = await usersCollection.countDocuments({
            $or: [{
                login: {
                    $regex: searchLoginTerm,
                    $options: "i"
                }
            }, {email: {$regex: searchEmailTerm, $options: "i"}}]
        })
        return paginator(pageNumber, pageSize, getCountUsers, findAndSortedUser)
    },
    // async loginUser(loginOrEmail: string, passwordHash: string){
    //   return usersCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}], passwordHash})
    // },
    async findUserByLoginOrEmail(loginOrEmail: string) {
        return await usersCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]})
    },
    async findUserByEmail(email: string) {
        return await usersCollection.findOne({email})
    },
    async findUserByID(id: string): Promise<DB_User_Type | null> {
        return await usersCollection.findOne({id})
    },
    async findUserByCode(code: string) {
        // console.log('code', code)
        return await usersCollection.findOne({'emailConfirmation.confirmationCode': code})
    },
    async createUser(newUser: DB_User_Type | any): Promise<UserType> {
        // console.log('newUser', newUser)
        const result = await usersCollection.insertOne(newUser)
        const {_id, passwordHash, ...newUserCopy} = newUser
        return newUserCopy
    },
    async updateUserConfirmationDate(user: DB_User_Type) {
        const updateUser = await usersCollection.updateOne({id: user.id}, {
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
        const updateUser = await usersCollection.updateOne({id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return updateUser.matchedCount === 1
    },
    async deleteUser(id: string): Promise<boolean> {
        const result = await usersCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}