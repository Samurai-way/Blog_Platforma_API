import {Router} from "express";
import {userPostValidator, usersGetValidator} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {usersController} from "../controllers/usersController";

export const usersRouter = Router({})

usersRouter.get('/', usersGetValidator, usersController.getUsers)
usersRouter.post('/', userPostValidator, usersController.createUser)
usersRouter.delete('/:id', basicAuthMiddleware, usersController.deleteUserById)