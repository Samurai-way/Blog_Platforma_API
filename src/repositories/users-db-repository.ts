import {DB_User_Type, usersCollection, UserType} from "../db/db";

export const usersRepository = {
    async createUser(newUser: DB_User_Type | any): Promise<UserType> {
        const result = await usersCollection.insertOne(newUser)
        const {_id, passwordHash, passwordSalt, ...newUserCopy} = newUser
        return newUserCopy
    }
}