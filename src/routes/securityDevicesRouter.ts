import {Request, Response, Router} from "express";
import {refreshTokenMiddleware} from "../middlewares/refreshTokenMiddleware";
import {jwtService} from "../application/jwt-service";
import {usersSessionRepository} from "../repositories/usersSession-db-repository";
import {userSessionService} from "../domain/userSession-service";


export const securityDevicesRouter = Router({})

securityDevicesRouter.get('/devices', refreshTokenMiddleware, async (req: Request, res: Response) => {
    // const refreshToken = req.cookies.refreshToken
    // const userId = await jwtService.getJwtPayloadFromRefreshToken(refreshToken)
    //
    // const getSessionsByUserID = await usersSessionRepository.getSessionByUserID(userId.userID)
    res.status(200).send({message: 'hello'})
    // send(getSessionsByUserID)
})

securityDevicesRouter.delete('/devices', refreshTokenMiddleware, async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    const getDeviceDataByToken = await jwtService.getJwtPayloadFromRefreshToken(refreshToken)
    const userId = getDeviceDataByToken.userID
    const deviceId = getDeviceDataByToken.deviceId
    await userSessionService.deleteAllDevice(userId, deviceId)
    res.sendStatus(204)
})

securityDevicesRouter.delete('/devices/:id', refreshTokenMiddleware, async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    const deviceId = req.params.id
    const deviceByDeviceId = await usersSessionRepository.findDeviceByDeviceId(deviceId)

    if (!deviceByDeviceId) return res.sendStatus(404)

    const getDataFromToken = await jwtService.getJwtPayloadFromRefreshToken(refreshToken)
    const userID = getDataFromToken.userID

    const findDeviceByUserId = await usersSessionRepository.findDeviceByUserId(userID)

    if (!findDeviceByUserId) return res.sendStatus(404)
    if (findDeviceByUserId.userId !== userID) return res.sendStatus(403)

    await usersSessionRepository.deleteDeviceByDeviceID(userID, deviceId)

    res.sendStatus(204)
})