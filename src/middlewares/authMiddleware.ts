import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersRepository} from "../repositories/users-db-repository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return res.send(401)
    const token = req.headers.authorization.split(' ')[1]
    const userID = await jwtService.getJwtPayloadFromRefreshToken(token)
    if (!userID) return res.send(401)
    const user = req.user = await usersRepository.findUserByID(userID.userID)
    if (!user) return res.send(404)
    return next()
}

export const checkTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return next()
    const token = req.headers.authorization.split(' ')[1]
    const userID = await jwtService.getJwtPayloadFromRefreshToken(token)
    if (!userID) return next()
    const user = req.user = await usersRepository.findUserByID(userID.userID)
    if (!user) return next()
    return next()
}