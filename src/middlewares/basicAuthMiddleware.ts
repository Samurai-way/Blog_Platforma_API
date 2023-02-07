import {NextFunction, Request, Response} from "express";

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authPassword = req.headers.authorization
    if (!authPassword) return res.sendStatus(401)
    if (authPassword === 'Basic YWRtaW46cXdlcnR5') {
        next()
    } else {
        return res.sendStatus(401)
    }
}