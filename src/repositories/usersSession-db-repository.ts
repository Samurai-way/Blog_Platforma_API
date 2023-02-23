import {UserSessionsType} from "../types";
import {UsersSessionModel} from "../db/db";

export class UsersSessionRepository {
    async createNewUserSession(userSession: UserSessionsType) {
        await UsersSessionModel.insertMany(userSession)
    }
    async getSessionByUserID(userId: string) {
        return UsersSessionModel.find({userId}, {_id: 0, userId: 0, __v: 0}).lean()
    }
    async deleteAllDevice(userId: string, deviceId: string): Promise<boolean> {
        const deleteAllSession = await UsersSessionModel.deleteMany({userId, deviceId: {$ne: deviceId}})
        return deleteAllSession.deletedCount === 1
    }
    async deleteDeviceByDeviceID(userId: string, deviceId: string) {
        const result = await UsersSessionModel.deleteOne({userId, deviceId: deviceId})
        return result.deletedCount === 1
    }
    async findDeviceByDeviceId(deviceId: string) {
        return UsersSessionModel.findOne({deviceId})
    }
    async findOneByDeviceIdUserIdAndLastActiveDate(userId: string, deviceId: string, lastActiveDate: string) {
        return UsersSessionModel.findOne({userId, deviceId, lastActiveDate})
    }
    async findDeviceByUserId(userId: string) {
        return UsersSessionModel.findOne({userId})
    }
    async updateUserSession(newSession: UserSessionsType) {
        return UsersSessionModel.updateOne({
            userId: newSession.userId,
            deviceId: newSession.deviceId
        }, {$set: newSession})
    }
}
export const usersSessionRepository = new UsersSessionRepository()
