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
            }, {projection: {_id: 0, passwordHash: 0}})
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
    async findUserByLoginOrEmail(loginOrEmail: string) {
        return await usersCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]})
    },
    async findUserByID(id: string) {
        // console.log('id', id)
        // console.log('users', users)
        return await usersCollection.findOne({id})
    },
    async createUser(newUser: DB_User_Type | any): Promise<UserType> {
        const result = await usersCollection.insertOne(newUser)
        const {_id, passwordHash, ...newUserCopy} = newUser
        return newUserCopy
    },
    async deleteUser(id: string): Promise<boolean> {
        const result = await usersCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}