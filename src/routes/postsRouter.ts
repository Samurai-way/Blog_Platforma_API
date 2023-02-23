import {Router} from "express";
import {getPostsPaginationValidator, postCommentsValidator, postPostsValidator} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {postsController} from "../compositions/postsComposition";


export const postsRouter = Router({})

postsRouter.get('/', getPostsPaginationValidator, postsController.getPosts.bind(postsController))
postsRouter.post('/', postPostsValidator, postsController.createPost.bind(postsController))
postsRouter.get('/:postID/comments', postsController.getCommentsByPostId.bind(postsController))
postsRouter.post('/:postID/comments', postCommentsValidator, postsController.createCommentByPostId.bind(postsController))
postsRouter.get('/:id', postsController.getPostById.bind(postsController))
postsRouter.put('/:id', postPostsValidator, postsController.updatePostById.bind(postsController))
postsRouter.delete('/:id', basicAuthMiddleware, postsController.deletePostById.bind(postsController))