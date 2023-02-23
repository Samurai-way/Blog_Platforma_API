import {Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {UsersSessionRepository} from "../repositories/usersSession-db-repository";
import {UserSessionService} from "../domain/userSession-service";
import {usersSessionRepository} from "../compositions/usersSessionComposition";


class SecurityDevicesController {
    usersSessionRepository: UsersSessionRepository;
    userSessionService: UserSessionService

    constructor() {
        this.usersSessionRepository = new UsersSessionRepository()
        this.userSessionService = new UserSessionService(usersSessionRepository)
    }

    async getDevices(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken
        const userId = await jwtService.getJwtPayloadFromRefreshToken(refreshToken)
        const getSessionsByUserID = await this.usersSessionRepository.getSessionByUserID(userId.userID)
        res.status(200).send(getSessionsByUserID)
    }

    async deleteDevices(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken
        const getDeviceDataByToken = await jwtService.getJwtPayloadFromRefreshToken(refreshToken)
        const {userId, deviceId} = getDeviceDataByToken
        await this.userSessionService.deleteAllDevice(userId, deviceId)
        res.sendStatus(204)
    }

    async deleteDeviceById(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken
        const deviceId = req.params.id

        const findDevicesByDeviceId = await this.userSessionService.findDevicesByDeviceId(deviceId)
        if (!findDevicesByDeviceId) return res.sendStatus(404)

        const findDeviceByUserId = await this.userSessionService.findDeviceByUserId(refreshToken)
        if (!findDeviceByUserId) return res.sendStatus(404)
        if (findDeviceByUserId.findDeviceByUserId?.userId !== findDeviceByUserId.userID) return res.sendStatus(403)

        const deletedSession = await this.userSessionService.deleteDeviceByDeviceID(findDeviceByUserId.userID, deviceId)
        if (!deletedSession) return res.sendStatus(403)
        res.sendStatus(204)
    }
}

export const securityDevicesController = new SecurityDevicesController()