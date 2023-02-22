import {TokensModel} from "../db/db";

class JwtRepository {
    async addRefreshTokenInBlackList(refreshToken: string) {
        return TokensModel.insertMany({refreshToken})
    }
}

export const jwtRepository = new JwtRepository()