import {Router} from "express";
import {refreshTokenMiddleware} from "../middlewares/refreshTokenMiddleware";
import {securityDevicesController} from "../controllers/securityDevicesController";


export const securityDevicesRouter = Router({})

securityDevicesRouter.get('/devices', refreshTokenMiddleware, securityDevicesController.getDevices)
securityDevicesRouter.delete('/devices', refreshTokenMiddleware, securityDevicesController.deleteDevices)
securityDevicesRouter.delete('/devices/:id', refreshTokenMiddleware, securityDevicesController.deleteDeviceById)