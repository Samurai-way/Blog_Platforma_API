import {Request, Response} from "express";
import {usersRepository} from "../repositories/users-db-repository";
import {authService} from "../domain/auth-service";

class AuthController {
    async getUser(req: Request, res: Response) {
        const user = req.user?.id
        if (!user) return res.sendStatus(401)
        const userInfo = await usersRepository.findUserByID(user)
        res.status(200).send({
            email: userInfo?.email,
            login: userInfo?.login,
            userId: userInfo?.id
        })
    }
    async loginUser(req: Request, res: Response){
        const {loginOrEmail, password} = req.body
        const ip = req.ip
        const title = req.headers['user-agent'] || "browser not found"
        const token = await authService.login(loginOrEmail, password, ip, title)
        if (!token) return res.sendStatus(401)
        res.cookie('refreshToken', token.refreshToken, {httpOnly: true, secure: true})
        res.status(200).send({accessToken: token.accessToken})
    }

}
export const authController = new AuthController()