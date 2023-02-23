import {Router} from "express";
import {userPostValidator, usersGetValidator} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {usersController} from "../compositions/usersComposition";


export const usersRouter = Router({})

usersRouter.get('/', usersGetValidator, usersController.getUsers.bind(usersController))
usersRouter.post('/', userPostValidator, usersController.createUser.bind(usersController))
usersRouter.delete('/:id', basicAuthMiddleware, usersController.deleteUserById.bind(usersController))