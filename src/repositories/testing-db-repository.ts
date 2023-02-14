import {blogsCollection, commentsCollection, postsCollection, usersCollection} from "../db/db";

export const testingDbRepository = {
    async deleteAllData(): Promise<boolean> {
        const clearBlogs = await blogsCollection.deleteMany({})
        const clearPosts = await postsCollection.deleteMany({})
        const clearUsers = await usersCollection.deleteMany({})
        const clearComments = await commentsCollection.deleteMany({})
        return clearBlogs.deletedCount === 1 && clearPosts.deletedCount === 1 && clearUsers.deletedCount === 1 && clearComments.deletedCount === 1
    }
}