import {Request, Response} from "express";
import {CommentsService} from "../domain/comments-service";
import {CommentsRepository} from "../repositories/comments-db-repository";
import {QueryRepository} from "../queryRepository/queryRepository";


export class CommentsController {
    commentsRepository: CommentsRepository
    queryRepository: QueryRepository;

    constructor(protected commentsService: CommentsService) {
        this.commentsRepository = new CommentsRepository()
        this.queryRepository = new QueryRepository()
    }

    async getCommentsById(req: Request, res: Response) {
        const commentId = req.params.commentId
        const userId = req.user?.id
        const getCommentById = await this.queryRepository.getCommentByIdWithLikeStatus(commentId, userId)
        if(!getCommentById) return res.sendStatus(404)
        res.status(200).send(getCommentById)
    }

    async deleteCommentById(req: Request, res: Response) {
        const commentID = req.params.commentId
        const user = req.user!
        const getCommentByID = await this.commentsRepository.getCommentById(commentID)
        if (!getCommentByID) return res.send(404)
        const deletedComment = await this.commentsService.deleteCommentByID(commentID, user)
        if (!deletedComment) return res.send(403)
        res.send(204)
    }

    async updateCommentById(req: Request, res: Response) {
        const commentID = req.params.commentId
        const user = req.user!
        const content = req.body.content
        const getCommentById = await this.commentsService.getCommentById(commentID)
        if (!getCommentById) return res.sendStatus(404)
        const updatedComment = await this.commentsService.updateCommentById(commentID, content, user)
        if (!updatedComment) return res.sendStatus(403)
        res.send(204)
    }

    async updateLikeStatusByCommentId(req: Request, res: Response) {
        const commentId = req.params.commentId
        const user = req.user!
        const likeStatus = req.body.likeStatus
        const findCommentById = await this.commentsService.updateLikeStatusByCommentId(commentId, user, likeStatus)
        if (!findCommentById) return res.sendStatus(404)
        res.sendStatus(204)
    }
}

