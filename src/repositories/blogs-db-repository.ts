import {blogsCollection, BlogsType, DB_BlogsType} from "../db/db";
import {ObjectId} from "mongodb";

export const blogsRepository = {
    async getBlogs(): Promise<BlogsType[]> {
        return blogsCollection.find({},{projection: {_id: 0}}).toArray()
    },
    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogsType | null> {
        const newBlog: DB_BlogsType = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const result = await blogsCollection.insertOne(newBlog)
        const {_id, ...blogsCopy} = newBlog
        return blogsCopy
    },
    async getBlogById(id: string): Promise<BlogsType | boolean> {
        const blog: BlogsType | null = await blogsCollection.findOne({id}, {projection: {_id: 0}})
        if (!blog) return false
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