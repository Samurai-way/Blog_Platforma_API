import {usersSessionCollection} from "../db/db";

export const usersSessionRepository = {
    async createNewUserSession(userSession: any) {
        await usersSessionCollection.insertMany(userSession)
    }
}