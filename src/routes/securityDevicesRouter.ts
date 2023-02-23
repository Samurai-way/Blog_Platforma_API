import {Router} from "express";
import {refreshTokenMiddleware} from "../middlewares/refreshTokenMiddleware";
import {securityDevicesController} from "../controllers/securityDevicesController";


export const securityDevicesRouter = Router({})

securityDevicesRouter.get('/devices', refreshTokenMiddleware, securityDevicesController.getDevices.bind(securityDevicesController))
securityDevicesRouter.delete('/devices', refreshTokenMiddleware, securityDevicesController.deleteDevices.bind(securityDevicesController))
securityDevicesRouter.delete('/devices/:id', refreshTokenMiddleware, securityDevicesController.deleteDeviceById.bind(securityDevicesController))