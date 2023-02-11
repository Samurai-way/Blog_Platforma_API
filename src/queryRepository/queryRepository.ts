import {blogsService} from "../domain/blogs-service";
import {postsRepository} from "../repositories/posts-db-repository";
import {ObjectId} from "mongodb";
import {PostsType} from "../db/db";
import {blogsRepository} from "../repositories/blogs-db-repository";

export const queryRepository = {
    async getBlogByID(id: string) {
        return await blogsService.getBlogById(id)
    },
    async findBlogPostByBlogID(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, blogId: string) {
        return await postsRepository.findBlogPostByBlogID(pageNumber, pageSize, sortBy, sortDirection, blogId)
    },
    async newPost(blogId: string, title: string, shortDescription: string, content: string) {
        const blogName = await blogsRepository.getBlogById(blogId)
        if (!blogName) return false
        const newBlogPost: PostsType = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blogName.name,
            createdAt: new Date().toISOString()
        }
        const result = await postsRepository.createNewBlogPost(newBlogPost)
        return result
    }
}