import {usersSessionCollection} from "../db/db";

export const usersSessionRepository = {
    async createNewUserSession(userSession: any) {
        await usersSessionCollection.insertOne(userSession)
    },
    async getSessionByUserID(userId: string) {
        return usersSessionCollection.find({userId}, {projection: {_id: 0, userId: 0}}).toArray()
    },
    async deleteAllDevice(userId: string, deviceId: undefined): Promise<boolean> {
        const deleteAllSession = await usersSessionCollection.deleteMany({userId, deviceId: {$ne: deviceId}})
        return deleteAllSession.deletedCount === 1
    },
    async deleteDeviceByDeviceID(userID: string, deviceId: any) {
        const result = await usersSessionCollection.deleteOne({userId: userID, deviceId: deviceId})
        return result.deletedCount === 1
    },
    async findDeviceByDeviceId(deviceId: string) {
        return usersSessionCollection.findOne({deviceId} as any)
    },
    async findDeviceByUserId(userId: string): Promise<any> {
        return usersSessionCollection.findOne({userId})
    }
}