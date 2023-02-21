import jwt from 'jsonwebtoken'
import {settings} from "./settings";
import {jwtRepository} from "../repositories/jwt-db-repository";
import {DB_User_Type} from "../types";

export const jwtService = {
    createJWT(user: DB_User_Type, deviceId: string) {
        const accessToken = jwt.sign({userID: user.id, deviceId: deviceId}, settings.JWT_SECRET, {expiresIn: '10s'})
        const refreshToken = jwt.sign({userID: user.id, deviceId: deviceId}, settings.JWT_SECRET, {expiresIn: '20s'})
        return {accessToken, refreshToken}
    },
    async addRefreshTokenInBlackList(refreshToken: string) {
        return jwtRepository.addRefreshTokenInBlackList(refreshToken)
    },
    async getJwtPayloadFromRefreshToken(token: string) {
        try {
            const res: any = jwt.verify(token, settings.JWT_SECRET)
            return res
        } catch (error) {
            return null
        }
    },
    getLastActiveDateFromToken(refreshToken: string): string {
        const payload: any = jwt.decode(refreshToken)
        return new Date(payload.iat * 1000).toISOString()
    }
}