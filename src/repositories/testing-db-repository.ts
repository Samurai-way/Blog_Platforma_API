import {
    AttemptsModel,
    BlogsModel,
    CommentsModel,
    PostsModel,
    TokensModel,
    UsersModel,
    UsersSessionModel
} from "../db/db";

export class TestingDbRepository {
    async deleteAllData(): Promise<boolean> {
        const clearBlogs = await BlogsModel.deleteMany({})
        const clearPosts = await PostsModel.deleteMany({})
        const clearUsers = await UsersModel.deleteMany({})
        const clearComments = await CommentsModel.deleteMany({})
        const clearSession = await UsersSessionModel.deleteMany({})
        const clearAttempts = await AttemptsModel.deleteMany({})
        const clearTokens = await TokensModel.deleteMany({})
        return clearBlogs.deletedCount === 1
            && clearPosts.deletedCount === 1
            && clearUsers.deletedCount === 1
            && clearComments.deletedCount === 1
            && clearSession.deletedCount === 1
            && clearAttempts.deletedCount === 1
            && clearTokens.deletedCount === 1
    }
}

