import {UserSessionsType} from "../db/db";
import {usersSessionRepository} from "../repositories/usersSession-db-repository";

export const userSessionService = {
    async createNewUserSession(ip: string, title: string, deviceId: string, userId: string, lastActiveDate: string) {
        const newSession: UserSessionsType = {
            ip,
            title,
            lastActiveDate,
            deviceId,
            userId
        }
        return usersSessionRepository.createNewUserSession(newSession)
    },
    async updateSession(ip: string, title: string, deviceId: string, userId: string, lastActiveDate: string) {
        const newSession: UserSessionsType = {
            ip,
            title,
            lastActiveDate,
            deviceId,
            userId
        }
        return usersSessionRepository.updateUserSession(newSession)
    },
    async deleteAllDevice(userId: string, deviceId: any) {
        return usersSessionRepository.deleteAllDevice(userId, deviceId)
    },
    async deleteDeviceByDeviceID(userId: string, deviceId: string) {
        return usersSessionRepository.deleteDeviceByDeviceID(userId, deviceId)
    }
}

