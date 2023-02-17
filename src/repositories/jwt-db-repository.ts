import {tokenCollection, TokenType} from "../db/db";

export const jwtRepository = {
    async addRefreshToken(refreshToken: TokenType) {
        return tokenCollection.insertMany(refreshToken)
    }
}