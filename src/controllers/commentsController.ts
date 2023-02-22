import {Request, Response} from "express";
import {commentsService} from "../domain/comments-service";
import {commentsRepository} from "../repositories/comments-db-repository";

class CommentsController {
    async getCommentsById(req: Request, res: Response){
        const commentId = req.params.commentId
        const getCommentById = await commentsService.getCommentById(commentId)
        if (!getCommentById) return res.send(404)
        res.status(200).send(getCommentById)
    }
    async deleteCommentById(req: Request, res: Response){
        const commentID = req.params.commentId
        const user = req.user!
        const getCommentByID = await commentsRepository.getCommentById(commentID)
        if (!getCommentByID) return res.send(404)
        const deletedComment = await commentsService.deleteCommentByID(commentID, user)
        if (!deletedComment) return res.send(403)
        res.send(204)
    }
    async updateCommentById(req: Request, res: Response){
        const commentID = req.params.commentId
        const user = req.user!
        const content = req.body.content
        const getCommentById = await commentsService.getCommentById(commentID)
        if (!getCommentById) return res.sendStatus(404)
        const updatedComment = await commentsService.updateCommentById(commentID, content, user)
        if (!updatedComment) return res.sendStatus(403)
        res.send(204)
    }
}

export const commentsControllers = new CommentsController()