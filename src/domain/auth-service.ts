import {ObjectId} from "mongodb";
import {jwtService} from "../application/jwt-service";
import {DB_User_Type} from "../types";
import {UsersService} from "./users-service";
import {UserSessionService} from "./userSession-service";


class AuthService {
    usersService: UsersService;
    userSessionService: UserSessionService;
    constructor() {
        this.usersService = new UsersService()
        this.userSessionService = new UserSessionService()
    }
    async login(loginOrEmail: string, password: string, ip: string, title: string) {
        const user = await this.usersService.checkUserCredentials(loginOrEmail, password)
        if (!user) return null
        const deviceId = new ObjectId().toString()
        const {accessToken, refreshToken} = jwtService.createJWT(user, deviceId)
        const lastActiveDate = jwtService.getLastActiveDateFromToken(refreshToken)
        await this.userSessionService.createNewUserSession(ip, title, deviceId, user.id, lastActiveDate)
        return {accessToken, refreshToken}
    }

    async refreshToken(user: DB_User_Type, deviceId: string, ip: string, title: string) {
        const {accessToken, refreshToken} = jwtService.createJWT(user, deviceId)
        const lastActiveDate = jwtService.getLastActiveDateFromToken(refreshToken)
        await this.userSessionService.updateSession(ip, title, deviceId, user.id, lastActiveDate)
        return {accessToken, refreshToken}
    }
}

export const authService = new AuthService()