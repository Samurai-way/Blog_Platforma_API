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