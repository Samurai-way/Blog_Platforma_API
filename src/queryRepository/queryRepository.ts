import {blogsService} from "../domain/blogs-service";
import {postsRepository} from "../repositories/posts-db-repository";
import {ObjectId} from "mongodb";
import {PostsType} from "../db/db";

export const queryRepository = {
    async getBlogByID(id: string) {
        return await blogsService.getBlogById(id)
    },
    async findBlogPost(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, blogId: string) {
        return await postsRepository.findBlogPost(pageNumber, pageSize, sortBy, sortDirection, blogId)
    },
    async newPost(blogId: string, title: string, shortDescription: string, content: string) {
        const newBlogPost: PostsType = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: "blog.name",
            createdAt: new Date().toISOString()
        }
        const result = await postsRepository.createNewBlogPost(newBlogPost)
        return result
    }
}