import {TokensModel} from "../db/db";

export class JwtRepository {
    async addRefreshTokenInBlackList(refreshToken: string) {
        return TokensModel.insertMany({refreshToken})
    }
}

