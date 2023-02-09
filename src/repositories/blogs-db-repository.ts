import {blogsCollection, BlogsType} from "../db/db";
import {ObjectId} from "mongodb";

export const blogsRepository = {
    async getBlogs(): Promise<BlogsType[]> {
        return blogsCollection.find({}).toArray()
    },
    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogsType> {
        const newBlog: BlogsType = {
            name,
            description,
            websiteUrl,
            createdAt: new Date(),
            isMembership: false
        }
        const result = await blogsCollection.insertOne(newBlog)
        return newBlog
    },
    async getBlogById(id: string): Promise<BlogsType | null> {
        const blog: BlogsType | null = await blogsCollection.findOne({_id: new ObjectId(id)})
        if (blog) {
            return blog
        } else {
            return null
        }
    },
    async updateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }
        })
        return result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    }
}