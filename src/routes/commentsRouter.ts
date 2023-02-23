import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import {ExpressErrorValidator} from "../middlewares/expressErrorValidator";
import {contentForComments, likeStatus} from "../validators/validators";
import {commentsController} from "../compositions/commentsComposition";


export const commentsRouter = Router({})

commentsRouter.get('/:commentId', commentsController.getCommentsById.bind(commentsController))
commentsRouter.delete('/:commentId', authMiddleware, commentsController.deleteCommentById.bind(commentsController))
commentsRouter.put('/:commentId', authMiddleware, contentForComments, ExpressErrorValidator, commentsController.updateCommentById.bind(commentsController))
commentsRouter.put('/:commentId/like-status', authMiddleware, likeStatus, ExpressErrorValidator, commentsController.updateLikeStatusByCommentId.bind(commentsController))