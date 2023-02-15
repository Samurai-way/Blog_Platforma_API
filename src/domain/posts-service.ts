import {CommentDBModalType, DB_PostsType, DB_User_Type, PostsType} from "../db/db";
import {ObjectId} from "mongodb";
import {postsRepository} from "../repositories/posts-db-repository";
import {blogsService} from "./blogs-service";
import {usersService} from "./users-service";


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
        return await postsRepository.createPost(newPost)
    },
    async getPostById(id: string): Promise<PostsType | null> {
        return await postsRepository.getPostById(id)
    },
    async createPostComment(postID: string, user: DB_User_Type, content: string) {
        const findPostByID = await postsService.getPostById(postID)
        if (!findPostByID) return null
        const newComment: CommentDBModalType = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            postId: findPostByID.id,
            content,
            commentatorInfo: {
                userId: user.id,
                userLogin: user.login
            },
            createdAt: new Date().toISOString(),
        }
        return await postsRepository.createPostComment({...newComment})
    },
    async updatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        return await postsRepository.updatePostById(id, title, shortDescription, content, blogId)
    },
    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id)
    }
}