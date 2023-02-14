import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authMiddleware} from "../middlewares/authMiddleware";
import {usersRepository} from "../repositories/users-db-repository";
import {AboutUserType} from "../db/db";


export const authRouter = Router({})

authRouter.get('/me', authMiddleware, async (req: Request, res: Response) => {
    const user = req.user?.id
    console.log('user', user)
    if(!user){
        res.sendStatus(401)
        return
    }
    const userInfo = await usersRepository.findUserByID(user)
    if (!userInfo) return res.status(404)
    const aboutUser: AboutUserType = {
        email: userInfo?.email,
        login: userInfo?.login,
        userId: userInfo?.id
    }
    res.status(200).send(aboutUser)
})
authRouter.post('/login', async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body
    const checkResult = await usersService.checkCredentials(loginOrEmail, password)
    if (!checkResult) return res.sendStatus(401)
    const token = await jwtService.createJWT(checkResult as any)
    res.status(200).send(token)
})