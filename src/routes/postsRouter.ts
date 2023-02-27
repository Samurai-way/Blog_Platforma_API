import {Router} from "express";
import {getPostsPaginationValidator, postCommentsValidator, postPostsValidator} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {container} from "../compositions/postsComposition";
import {checkTokenMiddleware} from "../middlewares/authMiddleware";
import {PostsController} from "../controllers/postsController";


const postsController = container.resolve(PostsController)
export const postsRouter = Router({})

postsRouter.get('/', getPostsPaginationValidator, postsController.getPosts.bind(postsController))
postsRouter.put('/:postID/like-status', checkTokenMiddleware, postsController.updateLikeStatusByPostId.bind(postsController)) // дз 12 _1 шаг_
postsRouter.post('/', postPostsValidator, postsController.createPost.bind(postsController))
postsRouter.get('/:postID/comments', checkTokenMiddleware, postsController.getCommentsByPostId.bind(postsController))
postsRouter.post('/:postID/comments', postCommentsValidator, postsController.createCommentByPostId.bind(postsController))
postsRouter.get('/:id', postsController.getPostById.bind(postsController))
postsRouter.put('/:id', postPostsValidator, postsController.updatePostById.bind(postsController))
postsRouter.delete('/:id', basicAuthMiddleware, postsController.deletePostById.bind(postsController))