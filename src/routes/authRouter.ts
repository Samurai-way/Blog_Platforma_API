import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authMiddleware} from "../middlewares/authMiddleware";
import {usersRepository} from "../repositories/users-db-repository";
import {email, login, password} from "../validators/validators";
import {ExpressErrorValidator} from "../middlewares/expressErrorValidator";


export const authRouter = Router({})

authRouter.get('/me', authMiddleware, async (req: Request, res: Response) => {
    const user = req.user?.id
    // console.log('user', user)
    if (!user) return res.sendStatus(401)
    const userInfo = await usersRepository.findUserByID(user)
    res.status(200).send({
        email: userInfo?.email,
        login: userInfo?.login,
        userId: userInfo?.id
    })
})
authRouter.post('/login', async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body
    const checkResult = await usersService.checkCredentials(loginOrEmail, password)
    if (!checkResult) return res.sendStatus(401)
    const token = jwtService.createJWT(checkResult)
    res.status(200).send({accessToken: token})
})

authRouter.post('/registration', login, password, email, ExpressErrorValidator, async (req: Request, res: Response) => {
    const {login, password, email} = req.body
    const user = await usersService.createUser(login, password, email)
    res.status(204).send(`<h1>Thank for your registration</h1>
       <p>To finish registration please follow the link below:
          <a href='https://somesite.com/confirm-email?code=your_confirmation_code'>complete registration</a>
      </p>`)
})