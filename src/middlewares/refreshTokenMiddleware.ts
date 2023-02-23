import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersRepository} from "../repositories/users-db-repository";
import {usersSessionRepository} from "../compositions/usersSessionComposition";

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    // console.log('refreshToken', refreshToken)
    if (!refreshToken) return res.sendStatus(401)

    const jwtPayload = await jwtService.getJwtPayloadFromRefreshToken(refreshToken)
    // console.log('checkVerifyToken', jwtPayload)
    if (!jwtPayload) return res.sendStatus(401)

    const findUserById = await usersRepository.findUserByID(jwtPayload.userID)
    // console.log('findUserById', findUserById)
    if (!findUserById) return res.sendStatus(401)

    const lastActiveDate = jwtService.getLastActiveDateFromToken(refreshToken)
    const userSession = await usersSessionRepository.findOneByDeviceIdUserIdAndLastActiveDate(jwtPayload.userID, jwtPayload.deviceId, lastActiveDate)
    // console.log('userSession', userSession)
    if (!userSession) return res.sendStatus(401)

    req.user = findUserById
    req.deviceId = jwtPayload.deviceId
    next()
}