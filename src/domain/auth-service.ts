import {usersService} from "./users-service";
import {ObjectId} from "mongodb";
import {jwtService} from "../application/jwt-service";
import {userSessionService} from "./userSession-service";
import {DB_User_Type} from "../types";


export const authService = {
    async login(loginOrEmail: string, password: string, ip: string, title: string) {
        const user = await usersService.checkUserCredentials(loginOrEmail, password)
        if (!user) return null
        const deviceId = new ObjectId().toString()
        const {accessToken, refreshToken} = jwtService.createJWT(user, deviceId)
        const lastActiveDate = jwtService.getLastActiveDateFromToken(refreshToken)
        await userSessionService.createNewUserSession(ip, title, deviceId, user.id, lastActiveDate)
        return {accessToken, refreshToken}
    },
    async refreshToken(user: DB_User_Type, deviceId: string, ip: string, title: string) {
        const {accessToken, refreshToken} = jwtService.createJWT(user, deviceId)
        const lastActiveDate = jwtService.getLastActiveDateFromToken(refreshToken)
        await userSessionService.updateSession(ip, title, deviceId, user.id, lastActiveDate)
        return {accessToken, refreshToken}
    }
}