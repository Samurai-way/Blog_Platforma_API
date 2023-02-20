import {UserSessionsType, usersSessionCollection} from "../db/db";

export const usersSessionRepository = {
    async createNewUserSession(userSession: UserSessionsType) {
        await usersSessionCollection.insertOne(userSession)
    },
    async getSessionByUserID(userId: string) {
        return usersSessionCollection.find({userId}, {projection: {_id: 0, userId: 0}}).toArray()
    },
    async deleteAllDevice(userId: string, deviceId: undefined): Promise<boolean> {
        const deleteAllSession = await usersSessionCollection.deleteMany({userId, deviceId: {$ne: deviceId}})
        return deleteAllSession.deletedCount === 1
    },
    async deleteDeviceByDeviceID(userId: string, deviceId: string) {
        const result = await usersSessionCollection.deleteOne({userId, deviceId: deviceId})
        return result.deletedCount === 1
    },
    async findDeviceByDeviceId(deviceId: string) {
        return usersSessionCollection.findOne({deviceId})
    },
    async findOneByDeviceIdUserIdAndLastActiveDate(userId: string, deviceId: string, lastActiveDate: string){
        // console.log(lastActiveDate)
        return usersSessionCollection.findOne({userId, deviceId, lastActiveDate})
    },
    async findDeviceByUserId(userId: string): Promise<any> {
        return usersSessionCollection.findOne({userId})
    },
    updateUserSession(newSession: UserSessionsType) {
        return usersSessionCollection.updateOne({userId: newSession.userId, deviceId: newSession.deviceId}, {$set: newSession})
    }
}