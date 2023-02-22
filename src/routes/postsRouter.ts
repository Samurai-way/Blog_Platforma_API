import {Router} from "express";
import {getPostsPaginationValidator, postCommentsValidator, postPostsValidator} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {postsController} from "../controllers/postsController";


export const postsRouter = Router({})

postsRouter.get('/', getPostsPaginationValidator, postsController.getPosts)
postsRouter.post('/', postPostsValidator, postsController.createPost)
postsRouter.get('/:postID/comments', postsController.getCommentsByPostId)
postsRouter.post('/:postID/comments', postCommentsValidator, postsController.createCommentByPostId)
postsRouter.get('/:id', postsController.getPostById)
postsRouter.put('/:id', postPostsValidator, postsController.updatePostById)
postsRouter.delete('/:id', basicAuthMiddleware, postsController.deletePostById)