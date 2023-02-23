import {ObjectId} from "mongodb";
import {BlogsType, DB_BlogsType} from "../types";
import {BlogsRepository} from "../repositories/blogs-db-repository";

class BlogsService {
    blogsRepository: BlogsRepository

    constructor() {
        this.blogsRepository = new BlogsRepository()
    }

    async getBlogs(searchNameTerm: any, sortBy: any, sortDirection: string, pageNumber: number, pageSize: number) {
        return this.blogsRepository.getBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
    }

    createBlog(name: string, description: string, websiteUrl: string): Promise<BlogsType | null> {
        const newBlog: DB_BlogsType = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        return this.blogsRepository.createBlog(newBlog)
    }

    async getBlogById(id: string): Promise<BlogsType | null> {
        return this.blogsRepository.getBlogById(id)
    }

    async updateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return this.blogsRepository.updateBlogById(id, name, description, websiteUrl)
    }

    async deleteBlog(id: string): Promise<boolean> {
        return this.blogsRepository.deleteBlog(id)
    }
}

export const blogsService = new BlogsService()