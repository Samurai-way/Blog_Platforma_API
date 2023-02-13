import {blogsCollection, postsCollection, usersCollection} from "../db/db";

export const testingDbRepository = {
    async deleteAllData(): Promise<boolean> {
        const clearBlogs = await blogsCollection.deleteMany({})
        const clearPosts = await postsCollection.deleteMany({})
        const clearUsers = await usersCollection.deleteMany({})
        return clearBlogs.deletedCount === 1 && clearPosts.deletedCount === 1 && clearUsers.deletedCount === 1
    }
}