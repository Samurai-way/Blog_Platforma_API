import {
    attemptsCollection,
    blogsCollection,
    commentsCollection,
    postsCollection,
    tokensCollection,
    usersCollection,
    usersSessionCollection
} from "../db/db";

export const testingDbRepository = {
    async deleteAllData(): Promise<boolean> {
        const clearBlogs = await blogsCollection.deleteMany({})
        const clearPosts = await postsCollection.deleteMany({})
        const clearUsers = await usersCollection.deleteMany({})
        const clearComments = await commentsCollection.deleteMany({})
        const clearSession = await usersSessionCollection.deleteMany({})
        const clearAttempts = await attemptsCollection.deleteMany({})
        const clearTokens = await tokensCollection.deleteMany({})
        return clearBlogs.deletedCount === 1
            && clearPosts.deletedCount === 1
            && clearUsers.deletedCount === 1
            && clearComments.deletedCount === 1
            && clearSession.deletedCount === 1
            && clearAttempts.deletedCount === 1
            && clearTokens.deletedCount === 1
    }
}