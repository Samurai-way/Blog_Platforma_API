import {DB_User_Type} from "../types";
import {CommentsRepository} from "../repositories/comments-db-repository";
import {PostsRepository} from "../repositories/posts-db-repository";

export class CommentsService {
    commentsRepository: CommentsRepository;
    postsRepository: PostsRepository
    constructor() {
        this.commentsRepository = new CommentsRepository()
        this.postsRepository = new PostsRepository()
    }
    async getComments(postID: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: string) {
        const findPostByID = await this.postsRepository.getPostById(postID)
        if (!findPostByID) return null
        return this.commentsRepository.getComments(postID, pageNumber, pageSize, sortBy, sortDirection)
    }

    async getCommentById(commentId: string) {
        return this.commentsRepository.getCommentById(commentId)
    }

    async deleteCommentByID(commentID: string, user: DB_User_Type): Promise<boolean> {
        return this.commentsRepository.deleteCommentByID(commentID, user)
    }

    async updateCommentById(commentId: string, content: string, user: DB_User_Type): Promise<boolean> {
        return this.commentsRepository.updateCommentById(commentId, content, user)
    }
}
