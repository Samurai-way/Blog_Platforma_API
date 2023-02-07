import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {postValidator} from "../validators/validators";


export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response) => {
    const findBlogs = blogsRepository.getBlogs()
    res.status(200).send(findBlogs)
})
blogsRouter.post('/', postValidator, (req: Request, res: Response) => {
    const {name, description, websiteUrl} = req.body
    const newBlog = blogsRepository.createBlog(name, description, websiteUrl)
    res.status(201).send(newBlog)
})
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const findVideo = blogsRepository.getBlogById(id)
    if (findVideo) {
        res.status(200).send(findVideo)
    } else {
        res.send(404)
    }
})
blogsRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const {name, description, websiteUrl} = req.body
    const updateBlog = blogsRepository.updateBlogById(id, name, description, websiteUrl)
    if (updateBlog) {
        const blog = blogsRepository.getBlogById(id)
        res.status(204).send(blog)
    } else {
        res.send(404)
    }
})
blogsRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const deleteBlog = blogsRepository.deleteBlog(id)
    if (deleteBlog) {
        res.send(204)
    } else {
        res.send(404)
    }
})