import {DB_User_Type} from "../db/db";
import jwt from 'jsonwebtoken'
import {settings} from "./settings";
import {ObjectId} from "mongodb";

export const jwtService = {
    async createJWT(user: DB_User_Type) {
        const token = jwt.sign({userID: user._id}, settings.JWT_SECRET, {expiresIn: '1h'})
        return token
    },
    async getUserIDByToken(token: string) {
        try {
            const res: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(res.userId)
        } catch (error) {
            return null
        }
    }
}