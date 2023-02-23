import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import {ExpressErrorValidator} from "../middlewares/expressErrorValidator";
import {contentForComments} from "../validators/validators";
import {commentsControllers} from "../controllers/commentsController";

export const commentsRouter = Router({})

commentsRouter.get('/:commentId', commentsControllers.getCommentsById.bind(commentsControllers))
commentsRouter.delete('/:commentId', authMiddleware, commentsControllers.deleteCommentById.bind(commentsControllers))
commentsRouter.put('/:commentId', authMiddleware, contentForComments, ExpressErrorValidator, commentsControllers.updateCommentById.bind(commentsControllers))