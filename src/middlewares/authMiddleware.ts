import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return res.send(401)

    const token = req.headers.authorization.split(' ')[1]
    const userID = await jwtService.getUserIDByToken(token)
    if (!userID) return res.send(401)
    req.user = await usersService.findUserById(userID)
    next()
    return
}