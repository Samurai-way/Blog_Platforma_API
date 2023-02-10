import {Request, Response, Router} from "express";
import {paginationValidator, postBlogValidator} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {blogsService} from "../domain/blogs-service";
import {queryRepository} from "../queryRepository/queryRepository";


export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    const findBlogs = await blogsService.getBlogs()
    res.status(200).send(findBlogs)
})
blogsRouter.post('/', postBlogValidator, async (req: Request, res: Response) => {
    const {name, description, websiteUrl} = req.body
    const newBlog = await blogsService.createBlog(name, description, websiteUrl)
    res.status(201).send(newBlog)
})
blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const findVideo = await blogsService.getBlogById(id)
    if (!findVideo) return res.send(404)
    res.status(200).send(findVideo)

})
blogsRouter.get('/:id/posts', paginationValidator, async (req: Request, res: Response) => {
    const id = req.params.id
    const sortDirection: any = req.query.sortDirection
    const sortBy: any = req.query.sortBy
    const pageSize: any = req.query.pageSize
    const pageNumber: any = req.query.pageNumber
    const findBlog = await queryRepository.getBlogByID(id)
    if (!findBlog) return res.send(404)
    const findBlogPost = await queryRepository.findBlogPost(pageNumber, pageSize, sortBy, sortDirection, id)
})
blogsRouter.put('/:id', postBlogValidator, async (req: Request, res: Response) => {
    const id = req.params.id
    const {name, description, websiteUrl} = req.body
    const updateBlog = await blogsService.updateBlogById(id, name, description, websiteUrl)
    if (!updateBlog) return res.send(404)
    const blog = await blogsService.getBlogById(id)
    res.status(204).send(blog)
})
blogsRouter.delete('/:id', basicAuthMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id
    const deleteBlog = await blogsService.deleteBlog(id)
    if (!deleteBlog) return res.send(404)
    res.send(204)
})