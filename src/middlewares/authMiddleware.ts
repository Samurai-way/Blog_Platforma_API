import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersRepository} from "../repositories/users-db-repository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return res.send(401)
    const token = req.headers.authorization.split(' ')[1]
    const userID = await jwtService.getUserIDByToken(token)
    // console.log('userID', userID)
    if (!userID) return res.send(401)
    req.user = await usersRepository.findUserByID(userID.toString())
    return next()
}