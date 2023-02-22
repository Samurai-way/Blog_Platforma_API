import {Router} from "express";
import {
    getBlogsPaginationValidator,
    paginationValidator,
    postBlogPostsValidator,
    postBlogValidator
} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {blogsController} from "../controllers/blogsController";


export const blogsRouter = Router({})

blogsRouter.get('/', getBlogsPaginationValidator, blogsController.getBlogs)
blogsRouter.post('/', postBlogValidator, blogsController.createBlog)
blogsRouter.post('/:id/posts', postBlogPostsValidator, blogsController.createPostByBlogId)
blogsRouter.get('/:id', blogsController.getBlogById)
blogsRouter.get('/:id/posts', paginationValidator, blogsController.getPostsByBlogId)
blogsRouter.put('/:id', postBlogValidator, blogsController.updateBlogById)
blogsRouter.delete('/:id', basicAuthMiddleware, blogsController.deleteBlogById)