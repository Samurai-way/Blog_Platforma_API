import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";


export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response) => {
    const findBlogs = blogsRepository.getBlogs()
    res.status(200).send(findBlogs)
})
blogsRouter.post('/', (req: Request, res: Response)=>{
    const {name, description, websiteUrl} = req.body
    const newBlog = blogsRepository.createBlog(name, description, websiteUrl)
    res.status(201).send(newBlog)
})