import {jwtService} from "../application/jwt-service";
import {UserSessionsType} from "../types";
import {UsersSessionRepository} from "../repositories/usersSession-db-repository";

export class UserSessionService {
    constructor(protected usersSessionRepository: UsersSessionRepository) {
    }
    async createNewUserSession(ip: string, title: string, deviceId: string, userId: string, lastActiveDate: string) {
        const newSession: UserSessionsType = {
            ip,
            title,
            lastActiveDate,
            deviceId,
            userId
        }
        return this.usersSessionRepository.createNewUserSession(newSession)
    }

    async updateSession(ip: string, title: string, deviceId: string, userId: string, lastActiveDate: string) {
        const newSession: UserSessionsType = {
            ip,
            title,
            lastActiveDate,
            deviceId,
            userId
        }
        return this.usersSessionRepository.updateUserSession(newSession)
    }

    async deleteAllDevice(userId: string, deviceId: string) {
        return this.usersSessionRepository.deleteAllDevice(userId, deviceId)
    }

    async findDevicesByDeviceId(deviceId: string) {
        return this.usersSessionRepository.findDeviceByDeviceId(deviceId)
    }

    async deleteDeviceByDeviceID(userId: string, deviceId: string) {
        return this.usersSessionRepository.deleteDeviceByDeviceID(userId, deviceId)
    }

    async findDeviceByUserId(refreshToken: string) {
        const getDataFromToken = await jwtService.getJwtPayloadFromRefreshToken(refreshToken)
        const userID = getDataFromToken.userID
        const findDeviceByUserId = await this.usersSessionRepository.findDeviceByUserId(userID)
        return {userID, findDeviceByUserId}
    }
}

