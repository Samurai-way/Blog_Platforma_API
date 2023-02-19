import {DB_User_Type, TokenType, UserSessionsType} from "../db/db";
import {jwtService} from "../application/jwt-service";

export const userSessionService = {
    async createNewUserSession(ip: string, title: string, deviceId: string, user: DB_User_Type, token: TokenType) {
        const checkToken = await jwtService.getUserIDByToken(token.refreshToken)
        const iatToken = checkToken.iat * 1000

        const newSession: UserSessionsType = {
            ip,
            title,
            lastActiveDate: iatToken,
            deviceId,
            userId: user.id
        }
        // return
    }
}