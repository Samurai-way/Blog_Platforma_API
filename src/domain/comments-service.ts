import {DB_User_Type} from "../types";
import {CommentsRepository} from "../repositories/comments-db-repository";
import {PostsRepository} from "../repositories/posts-db-repository";
import {UsersRepository} from "../repositories/users-db-repository";
import {LikeStatusRepository} from "../repositories/likeStatus-db-repository";
import {paginator} from "../helpers/pagination";

export class CommentsService {
    postsRepository: PostsRepository;
    usersRepository: UsersRepository;
    likeStatusRepository: LikeStatusRepository;


    constructor(protected commentsRepository: CommentsRepository) {
        this.postsRepository = new PostsRepository()
        this.usersRepository = new UsersRepository()
        this.likeStatusRepository = new LikeStatusRepository()
    }

    async getComments(postID: string, userId: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: string) {
        const findAndSortedComment = await this.commentsRepository.findAndSortedComments(pageNumber, pageSize, sortBy, sortDirection, postID)
        const getUsersCount = await this.commentsRepository.getCountCollection(postID)
        // console.log('getUsersCount', getUsersCount)
        return paginator(pageNumber, pageSize, getUsersCount, findAndSortedComment)
        // return this.commentsRepository.getComments(postID, pageNumber, pageSize, sortBy, sortDirection)
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

    async updateLikeStatusByCommentId(commentId: string, user: DB_User_Type, likeStatus: string) {
        const findCommentById = await this.commentsRepository.getCommentById(commentId)
        if (!findCommentById) return null
        return this.likeStatusRepository.updateLikeStatusByCommentId(commentId, user.id, user.login, likeStatus)
    }
}
