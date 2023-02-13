import {Request, Response, Router} from "express";
import {userPostValidator} from "../validators/validators";
import {usersService} from "../domain/users-service";

export const usersRouter = Router({})

usersRouter.post('/', userPostValidator, async (req: Request, res: Response) => {
    const {login, password, email} = req.body
    const newUser = await usersService.createUser(login, password, email)
    res.status(201).send(newUser)
})