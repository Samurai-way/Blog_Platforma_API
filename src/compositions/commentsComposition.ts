import "reflect-metadata"
import {CommentsRepository} from "../repositories/comments-db-repository";
import {CommentsService} from "../domain/comments-service";
import {CommentsController} from "../controllers/commentsController";

export const commentsRepository = new CommentsRepository()
const commentsService = new CommentsService(commentsRepository)
export const commentsController = new CommentsController(commentsService)

// export const container = new Container()
// container.bind(CommentsController).to(CommentsController)
// container.bind(CommentsService).to(CommentsService)
// container.bind(CommentsRepository).to(CommentsRepository)