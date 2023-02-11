import {Request, Response, Router} from "express";
import {getBlogsPaginationValidator, paginationValidator, postBlogValidator} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {blogsService} from "../domain/blogs-service";
import {queryRepository} from "../queryRepository/queryRepository";
import {getPagination} from "../helpers/pagination";


export const blogsRouter = Router({})

blogsRouter.get('/', getBlogsPaginationValidator, async (req: Request, res: Response) => {
    const {searchNameTerm, sortBy, sortDirection, pageNumber, pageSize} = getPagination(req.query)
    const findBlogs: any = await blogsService.getBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
    res.status(200).send(findBlogs)
})
blogsRouter.post('/', postBlogValidator, async (req: Request, res: Response) => {
    const {name, description, websiteUrl} = req.body
    const newBlog = await blogsService.createBlog(name, description, websiteUrl)
    res.status(201).send(newBlog)
})
blogsRouter.post('/:id/posts', async (req: Request, res: Response) => {
    const id = req.params.id
    const {title, shortDescription, content} = req.body
    const findBlog = await queryRepository.getBlogByID(id)
    if (!findBlog) return res.sendStatus(404)
    const newPost = await queryRepository.newPost(id, title, shortDescription, content)
    res.status(201).send(newPost)
})
blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    console.log(id)
    const findVideo = await blogsService.getBlogById(id)
    if (!findVideo) return res.send(404)
    res.status(200).send(findVideo)

})
blogsRouter.get('/:id/posts', paginationValidator, async (req: Request, res: Response) => {
    const id = req.params.id
    const {pageNumber, pageSize, sortBy, sortDirection} = getPagination(req.query)
    const findBlog = await queryRepository.getBlogByID(id)
    if (!findBlog) return res.send(404)
    const findBlogPost = await queryRepository.findBlogPost(pageNumber, pageSize, sortBy, sortDirection, id)
    res.status(200).send(findBlog)
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