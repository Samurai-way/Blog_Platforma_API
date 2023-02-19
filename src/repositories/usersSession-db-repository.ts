import {usersSessionCollection} from "../db/db";

export const usersSessionRepository = {
    async createNewUserSession(userSession: any) {
        // console.log('userSession', userSession)
        await usersSessionCollection.insertOne(userSession)
    },
    async getSessionByUserID(userId: string) {
        // console.log('userId', userId)
        return usersSessionCollection.findOne({userId}, {projection: {_id: 0, userId: 0}})
    },
    async deleteAllDevice(userId: string, deviceId: undefined): Promise<boolean> {
        const deleteAllSession = await usersSessionCollection.deleteMany({userId, deviceId: {$ne: deviceId}})
        return deleteAllSession.deletedCount === 1
    }
}