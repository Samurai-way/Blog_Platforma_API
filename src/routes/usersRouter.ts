import {Request, Response, Router} from "express";
import {userPostValidator} from "../validators/validators";

export const usersRouter = Router({})

usersRouter.post('/', userPostValidator, async (req: Request, res: Response) => {
    const {login, password, email} = req.body
})