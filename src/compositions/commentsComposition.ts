import {CommentsRepository} from "../repositories/comments-db-repository";
import {CommentsService} from "../domain/comments-service";
import {CommentsController} from "../controllers/commentsController";

export const commentsRepository = new CommentsRepository()
const commentsService = new CommentsService(commentsRepository)
export const commentsController = new CommentsController(commentsService)