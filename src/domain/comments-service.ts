import {commentsRepository} from "../repositories/comments-db-repository";
import {postsRepository} from "../repositories/posts-db-repository";
import {DB_User_Type} from "../db/db";

export const commentsService = {
    async getComments(postID: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: string) {
        const findPostByID = await postsRepository.getPostById(postID)
        if (!findPostByID) return null
        return await commentsRepository.getComments(postID, pageNumber, pageSize, sortBy, sortDirection)
    },
    async getCommentById(commentId: string) {
        return await commentsRepository.getCommentById(commentId)
    },
    async deleteCommentByID(commentID: string, user: DB_User_Type): Promise<boolean> {
        return await commentsRepository.deleteCommentByID(commentID, user)
    },
    async updateCommentById(commentId: string, content: string, user: DB_User_Type): Promise<boolean> {
        return await commentsRepository.updateCommentById(commentId, content, user)
    }
}