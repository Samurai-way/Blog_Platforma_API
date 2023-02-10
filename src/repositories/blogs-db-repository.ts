import {blogsCollection, BlogsType, DB_BlogsType} from "../db/db";
import {ObjectId} from "mongodb";

export const blogsRepository = {
    async getBlogs(): Promise<BlogsType[]> {
        return blogsCollection.find({},{projection: {_id: 0}}).toArray()
    },
    async createBlog(newBlog: DB_BlogsType): Promise<BlogsType | null> {
        const result = await blogsCollection.insertOne(newBlog)
        const {_id, ...blogsCopy} = newBlog
        return blogsCopy
    },
    async getBlogById(id: string): Promise<BlogsType | null> {
        const blog: BlogsType | null = await blogsCollection.findOne({id}, {projection: {_id: 0}})
        return blog
    },
    async updateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne({id}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }
        })
        return result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}