import {Router} from "express";
import {
    getBlogsPaginationValidator,
    paginationValidator,
    postBlogPostsValidator,
    postBlogValidator
} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {blogsController} from "../compositions/blogsComposition";


export const blogsRouter = Router({})

blogsRouter.get('/', getBlogsPaginationValidator, blogsController.getBlogs.bind(blogsController))
blogsRouter.post('/', postBlogValidator, blogsController.createBlog.bind(blogsController))
blogsRouter.post('/:id/posts', postBlogPostsValidator, blogsController.createPostByBlogId.bind(blogsController))
blogsRouter.get('/:id', blogsController.getBlogById.bind(blogsController))
blogsRouter.get('/:id/posts', paginationValidator, blogsController.getPostsByBlogId.bind(blogsController))
blogsRouter.put('/:id', postBlogValidator, blogsController.updateBlogById.bind(blogsController))
blogsRouter.delete('/:id', basicAuthMiddleware, blogsController.deleteBlogById.bind(blogsController))