import {DB_PostsType, postsCollection, PostsType} from "../db/db";
import {ObjectId} from "mongodb";
import {postsRepository} from "../repositories/posts-db-repository";


export const postsService = {
    async getPosts(): Promise<PostsType[] | undefined> {
        return await postsRepository.getPosts()
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<DB_PostsType | null> {
        const newPost: PostsType = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: "blog.name",
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