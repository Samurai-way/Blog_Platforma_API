import {Request, Response} from "express";
import {usersRepository} from "../repositories/users-db-repository";
import {authService} from "../domain/auth-service";
import {usersService} from "../domain/users-service";
import {queryRepository} from "../queryRepository/queryRepository";
import {jwtService} from "../application/jwt-service";
import {userSessionService} from "../domain/userSession-service";
import {email} from "../validators/validators";

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

    async loginUser(req: Request, res: Response) {
        const {loginOrEmail, password} = req.body
        const ip = req.ip
        const title = req.headers['user-agent'] || "browser not found"
        const token = await authService.login(loginOrEmail, password, ip, title)
        if (!token) return res.sendStatus(401)
        res.cookie('refreshToken', token.refreshToken, {httpOnly: true, secure: true})
        res.status(200).send({accessToken: token.accessToken})
    }

    async refreshToken(req: Request, res: Response) {
        const deviceId = req.deviceId!
        const user = req.user!
        const ip = req.ip
        const title = req.headers['user-agent'] || "browser not found"
        const newTokenPair = await authService.refreshToken(user, deviceId, ip, title)
        res.cookie('refreshToken', newTokenPair.refreshToken, {httpOnly: true, secure: true})
        res.status(200).send({accessToken: newTokenPair.accessToken})
    }

    async registration(req: Request, res: Response) {
        const {login, password, email} = req.body
        const findByLogin = await usersService.findUserByLogin(login)
        const findByEmail = await usersService.findUserByEmail(email)
        if (findByLogin?.login === login) return res.status(400).send({
            errorsMessages: [{message: login, field: "login"}]
        })
        if (findByEmail?.email === email) return res.status(400).send({
            errorsMessages: [{message: email, field: "email"}]
        })
        const user = await usersService.createUser(login, password, email)
        if (!user) return res.sendStatus(404)
        res.send(204)
    }

    async registrationConfirmation(req: Request, res: Response) {
        const code = req.body.code
        const error = {errorsMessages: [{message: code, field: "code"}]}
        const findUserByCode = await usersService.findUserByCode(code)
        if (!findUserByCode) return res.status(400).send(error)
        if (findUserByCode.emailConfirmation.isConfirmed) return res.status(400).send(error)
        await usersService.confirmEmail(code, findUserByCode)
        res.send(204)
    }

    async registrationEmailResending(req: Request, res: Response) {
        const email = req.body.email
        const findUserByEmail = await usersService.findUserByEmail(email)
        if (!findUserByEmail || findUserByEmail.emailConfirmation.isConfirmed) return res.status(400).send({
            errorsMessages: [{
                message: email,
                field: "email"
            }]
        })
        await queryRepository.resendingEmail(email, findUserByEmail)
        return res.sendStatus(204)
    }

    async logout(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken!
        const {userID, deviceId} = await jwtService.getJwtPayloadFromRefreshToken(refreshToken)
        const clearTokensPair = await jwtService.addRefreshTokenInBlackList(refreshToken)
        if (!clearTokensPair) return res.sendStatus(401)
        await userSessionService.deleteDeviceByDeviceID(userID, deviceId)
        res.sendStatus(204)
    }
    async passwordRecovery(req: Request, res: Response) {
        const email = req.body.email
        await usersService.findUserByEmailAndSendHimLetter(email)
        res.sendStatus(204)
    }
    async newPassword(req: Request, res: Response){
        const {newPassword, recoveryCode} = req.body
        const findUserRecoveryCodeAndChangeNewPassword = await usersService.findUserRecoveryCodeAndChangeNewPassword(newPassword, recoveryCode)
        if (!findUserRecoveryCodeAndChangeNewPassword) return res.status(400).send({
            errorsMessages: [{
                message: "Error",
                field: "recoveryCode"
            }]
        })
        res.sendStatus(204)
    }
}

export const authController = new AuthController()