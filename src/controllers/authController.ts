import {Request, Response} from "express";
import {usersRepository} from "../repositories/users-db-repository";

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

}
export const authController = new AuthController()