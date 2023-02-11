import {DB_PostsType, PostsType} from "../db/db";
import {ObjectId} from "mongodb";
import {postsRepository} from "../repositories/posts-db-repository";
import {blogsService} from "./blogs-service";


export const postsService = {
    async getPosts(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string) {
        return await postsRepository.getPosts(pageNumber, pageSize, sortBy, sortDirection)
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<DB_PostsType | null> {
        const blogName = await blogsService.getBlogById(blogId)
        if (!blogName) return null
        const newPost: PostsType = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blogName.name,
            createdAt: new Date().toISOString()
        }
        const result = await postsRepository.createPost(newPost)
        return result
    },
    async getPostById(id: string): Promise<PostsType | null> {
        return await postsRepository.getPostById(id)
    },
    async updatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        return await postsRepository.updatePostById(id, title, shortDescription, content, blogId)
    },
    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id)
    }
}