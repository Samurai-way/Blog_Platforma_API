import {Request, Response, Router} from "express";
import {refreshTokenMiddleware} from "../middlewares/refreshTokenMiddleware";
import {jwtService} from "../application/jwt-service";
import {usersSessionRepository} from "../repositories/usersSession-db-repository";


export const securityDevicesRouter = Router({})

securityDevicesRouter.get('/devices', refreshTokenMiddleware, async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    // console.log('refreshToken', refreshToken)
    const getDeviceDataByToken = await jwtService.getUserIDByToken(refreshToken)
    // console.log('getDeviceDataByToken', getDeviceDataByToken)
    const userId = getDeviceDataByToken.userID
    // console.log('userId', userId)
    const getSessionByUserID = await usersSessionRepository.getSessionByUserID(userId)
    console.log('getSessionByUserID', getSessionByUserID)
    res.status(200).send(getSessionByUserID)
})

securityDevicesRouter.delete('/devices', refreshTokenMiddleware, async (req: Request, res: Response) => {

})