import {TokensModel} from "../db/db";

export const jwtRepository = {
    async addRefreshTokenInBlackList(refreshToken: string) {
        return TokensModel.insertMany({refreshToken})
    }
}