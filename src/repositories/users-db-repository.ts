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
            })
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)

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
    async createUser(newUser: DB_User_Type | any): Promise<UserType> {
        const result = await usersCollection.insertOne(newUser)
        const {_id, passwordHash, passwordSalt, ...newUserCopy} = newUser
        return newUserCopy
    },
    async deleteUser(id: string): Promise<boolean> {
        const result = await usersCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}