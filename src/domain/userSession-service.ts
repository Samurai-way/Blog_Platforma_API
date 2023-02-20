import {UserSessionsType} from "../db/db";
import {usersSessionRepository} from "../repositories/usersSession-db-repository";
import {jwtService} from "../application/jwt-service";

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
    async deleteAllDevice(userId: string, deviceId: string) {
        return usersSessionRepository.deleteAllDevice(userId, deviceId)
    },
    async findDevicesByDeviceId(deviceId: string) {
        return usersSessionRepository.findDeviceByDeviceId(deviceId)
    },
    async deleteDeviceByDeviceID(userId: string, deviceId: string) {
        return usersSessionRepository.deleteDeviceByDeviceID(userId, deviceId)
    },
    async findDeviceByUserId(refreshToken: string) {
        const getDataFromToken = await jwtService.getJwtPayloadFromRefreshToken(refreshToken)
        const userID = getDataFromToken.userID
        const findDeviceByUserId = await usersSessionRepository.findDeviceByUserId(userID)
        return {userID, findDeviceByUserId}
    }
}

