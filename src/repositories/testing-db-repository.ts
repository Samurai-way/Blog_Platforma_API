import {blogsCollection, postsCollection} from "../db/db";

export const testingDbRepository = {
    async deleteAllData(): Promise<boolean> {
        const clearBlogs = await blogsCollection.deleteMany({})
        const clearPosts = await postsCollection.deleteMany({})
        return clearBlogs.deletedCount === 1 && clearPosts.deletedCount === 1
    }
}