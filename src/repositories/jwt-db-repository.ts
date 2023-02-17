import {tokensCollection, TokenType} from "../db/db";

export const jwtRepository = {
    async addRefreshTokenInBlackList(refreshToken: string) {
        return tokensCollection.insertOne({refreshToken})
    },
    async findTokenInBlackList(refreshToken: string){
        return tokensCollection.findOne({refreshToken})
    }
}