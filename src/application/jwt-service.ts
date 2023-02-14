import {DB_User_Type} from "../db/db";
import jwt from 'jsonwebtoken'
import {settings} from "./settings";

export const jwtService = {
    async createJWT(user: DB_User_Type): Promise<string> {
        const token = jwt.sign({userID: user.id}, settings.JWT_SECRET, {expiresIn: '1h'})
        return token
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