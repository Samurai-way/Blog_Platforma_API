import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authMiddleware} from "../middlewares/authMiddleware";
import {usersRepository} from "../repositories/users-db-repository";
import {email, login, password} from "../validators/validators";
import {ExpressErrorValidator} from "../middlewares/expressErrorValidator";
import {queryRepository} from "../queryRepository/queryRepository";


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
    const findByLoginOrEmail = await usersRepository.findUserByLoginOrEmail(login)

    if (findByLoginOrEmail?.login === login) return res.status(400).send([{message: 'Invalid login', field: "login"}])
    if (findByLoginOrEmail?.email === email) return res.status(400).send([{message: 'Invalid email', field: "email"}])

    const user = await usersService.createUser(login, password, email)
    if (!user) return res.sendStatus(404)
    res.send(204)
})

authRouter.post('/registration-confirmation', async (req: Request, res: Response) => {
    const code = req.body.code
    console.log('code', code)
    const error = {"errorsMessages": [{message: code, field: code}]}

    const findUserByCode = await usersService.findUserByCode(code)
    if (!findUserByCode) return res.status(400).send(error)
    if (findUserByCode.emailConfirmation.isConfirmed) return res.status(400).send(error)
    await usersService.confirmEmail(code)
    res.send(204)
})
authRouter.post('/registration-email-resending', email, ExpressErrorValidator, async (req: Request, res: Response) => {
    const email = req.body.email
    const findUserByEmail: any = await usersRepository.findUserByEmail(email)
    // @ts-ignore
    if (!findUserByEmail || findUserByEmail.emailConfirmation.isConfirmed) {
        return res.status(400).send({errorsMessages: [{message: email, field: email}]})
    } else {
        await queryRepository.resendingEmail(email, findUserByEmail)
        return res.sendStatus(204)
    }
})