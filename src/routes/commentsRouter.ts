import {Request, Response, Router} from "express";
import {commentsService} from "../domain/comments-service";
import {authMiddleware} from "../middlewares/authMiddleware";
import {commentsRepository} from "../repositories/comments-db-repository";
import {ExpressErrorValidator} from "../middlewares/expressErrorValidator";
import {contentForComments} from "../validators/validators";

export const commentsRouter = Router({})

commentsRouter.get('/:commentId', authMiddleware, async (req: Request, res: Response) => {
    const commentId = req.params.commentId
    const getCommentById = await commentsService.getCommentById(commentId)
    if (!getCommentById) return res.send(404)
    res.status(200).send(getCommentById)
})

commentsRouter.delete('/:commentId', authMiddleware, async (req: Request, res: Response) => {
    const commentID = req.params.commentId
    const user = req.user!
    const getCommentByID = await commentsRepository.getCommentById(commentID)
    if (!getCommentByID) return res.send(404)
    const deletedComment = await commentsService.deleteCommentByID(commentID, user)
    if (!deletedComment) return res.send(403)
    res.send(204)
})

commentsRouter.put('/:commentId', authMiddleware, contentForComments, ExpressErrorValidator, async (req: Request, res: Response) => {
    const commentID = req.params.commentId
    const user = req.user!
    const content = req.body.content
    const getCommentById = await commentsService.getCommentById(commentID)
    if (!getCommentById) return res.sendStatus(404)
    const updatedComment = await commentsService.updateCommentById(commentID, content, user)
    if (!updatedComment) return res.sendStatus(403)
    res.send(204)
})