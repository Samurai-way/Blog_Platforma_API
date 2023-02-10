import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-db-repository";
import {postBlogValidator} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {blogsService} from "../domain/blogs-service";


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
    const findVideo = await blogsRepository.getBlogById(id)
    if (findVideo) {
        res.status(200).send(findVideo)
    } else {
        res.send(404)
    }
})
blogsRouter.put('/:id', postBlogValidator, async (req: Request, res: Response) => {
    const id = req.params.id
    const {name, description, websiteUrl} = req.body
    const updateBlog = await blogsRepository.updateBlogById(id, name, description, websiteUrl)
    if (updateBlog) {
        const blog = await blogsRepository.getBlogById(id)
        res.status(204).send(blog)
    } else {
        res.send(404)
    }
})
blogsRouter.delete('/:id', basicAuthMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id
    const deleteBlog = await blogsRepository.deleteBlog(id)
    if (deleteBlog) {
        res.send(204)
    } else {
        res.send(404)
    }
})