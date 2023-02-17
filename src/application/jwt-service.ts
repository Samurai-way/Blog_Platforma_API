import {DB_User_Type} from "../db/db";
import jwt from 'jsonwebtoken'
import {settings} from "./settings";
import {jwtRepository} from "../repositories/jwt-db-repository";

export const jwtService = {
    createJWT(user: DB_User_Type) {
        const accessToken =  jwt.sign({userID: user.id}, settings.JWT_SECRET, {expiresIn: '10s'})
        const refreshToken = jwt.sign({userID: user.id}, settings.JWT_SECRET, {expiresIn: '20s'})
        return {accessToken, refreshToken}
    },
    async addRefreshTokenInBlackList(refreshToken: string) {
        await jwtRepository.addRefreshTokenInBlackList(refreshToken)
    },
    async findTokenInBlackList(refreshToken: string){
        return  jwtRepository.findTokenInBlackList(refreshToken)
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