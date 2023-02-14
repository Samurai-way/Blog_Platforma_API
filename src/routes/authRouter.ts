import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";


export const authRouter = Router({})

authRouter.post('/login', async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body
    const checkResult = await usersService.checkCredentials(loginOrEmail, password)
    if (!checkResult) return res.sendStatus(401)
    // const token = await
})