import {ObjectId} from "mongodb";
import {blogsCollection, BlogsType, DB_BlogsType} from "../db/db";
import {blogsRepository} from "../repositories/blogs-db-repository";

export const blogsService = {
    async getBlogs(): Promise<BlogsType[]> {
        return await blogsRepository.getBlogs()
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
        const result = await blogsRepository.createBlog(newBlog)
        return result
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