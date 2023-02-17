import {DB_User_Type} from "../db/db";
import jwt from 'jsonwebtoken'
import {settings} from "./settings";
import {jwtRepository} from "../repositories/jwt-db-repository";

export const jwtService = {
    createJWT(user: DB_User_Type): string {
        return jwt.sign({userID: user.id}, settings.JWT_SECRET, {expiresIn: '1000s'})
        return jwt.sign({userID: user.id}, settings.JWT_REFRESH, {expiresIn: '2000s'})
    },
    async addRefreshToken(refreshToken: string) {
        await jwtRepository.addRefreshToken({refreshToken})
    },
    async getUserIDByToken(token: string) {
        try {
            const res: any = jwt.verify(token, settings.JWT_SECRET)
            return res.userID
        } catch (error) {
            return null
        }
    }
}