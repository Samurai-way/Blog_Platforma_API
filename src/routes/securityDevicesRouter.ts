import {Request, Response, Router} from "express";
import {refreshTokenMiddleware} from "../middlewares/refreshTokenMiddleware";


export const securityDevicesRouter = Router({})

securityDevicesRouter.get('/devices', refreshTokenMiddleware, (req: Request, res: Response) => {

})