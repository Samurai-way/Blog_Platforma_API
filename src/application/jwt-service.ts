import jwt from 'jsonwebtoken'
import {settings} from "./settings";
import {DB_User_Type} from "../types";
import {JwtRepository} from "../repositories/jwt-db-repository";

class JwtService {
    jwtRepository: JwtRepository;
    constructor() {
        this.jwtRepository = new JwtRepository()
    }
    createJWT(user: DB_User_Type, deviceId: string) {
        const accessToken = jwt.sign({userID: user.id, deviceId: deviceId}, settings.JWT_SECRET, {expiresIn: '5m'})
        const refreshToken = jwt.sign({userID: user.id, deviceId: deviceId}, settings.JWT_SECRET, {expiresIn: '10m'})
        return {accessToken, refreshToken}
    }

    async addRefreshTokenInBlackList(refreshToken: string) {
        return this.jwtRepository.addRefreshTokenInBlackList(refreshToken)
    }

    async getJwtPayloadFromRefreshToken(token: string) {
        try {
            const res: any = jwt.verify(token, settings.JWT_SECRET)
            return res
        } catch (error) {
            return null
        }
    }

    getLastActiveDateFromToken(refreshToken: string): string {
        const payload: any = jwt.decode(refreshToken)
        return new Date(payload.iat * 1000).toISOString()
    }
}

export const jwtService = new JwtService()