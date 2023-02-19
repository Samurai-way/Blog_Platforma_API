import {DB_User_Type, TokenType, UserSessionsType} from "../db/db";
import {jwtService} from "../application/jwt-service";
import {usersSessionRepository} from "../repositories/usersSession-db-repository";

export const userSessionService = {
    async createNewUserSession(ip: string, title: string, deviceId: string, user: DB_User_Type, token: TokenType) {
        const checkToken = await jwtService.getUserIDByToken(token.refreshToken)
        const iatToken = checkToken.iat * 1000
        // console.log('iatToken', iatToken)

        const newSession: UserSessionsType = {
            ip,
            title,
            lastActiveDate: iatToken,
            deviceId,
            userId: user.id
        }
        return usersSessionRepository.createNewUserSession(newSession)
    },
    // async getSessionByUserID(userID: string){
    //     return usersSessionRepository.getSessionByUserID(userID)
    // }
}

