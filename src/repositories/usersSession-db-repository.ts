import {usersSessionCollection} from "../db/db";

export const usersSessionRepository = {
    async createNewUserSession(userSession: any) {
        // console.log('userSession', userSession)
        await usersSessionCollection.insertOne(userSession)
    }
}