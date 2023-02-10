import {ObjectId} from "mongodb";
import {BlogsType, DB_BlogsType} from "../db/db";
import {blogsRepository} from "../repositories/blogs-db-repository";

export const blogsService = {
    async getBlogs(searchNameTerm: string, sortBy: string, sortDirection: string, pageNumber: number, pageSize: number) {
        return await blogsRepository.getBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
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
    async getBlogById(id: string): Promise<BlogsType | null> {
        return await blogsRepository.getBlogById(id)
    },
    async updateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return await blogsRepository.updateBlogById(id, name, description, websiteUrl)
    },
    async deleteBlog(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(id)
    }
}