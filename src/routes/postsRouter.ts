import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {postPostsValidator} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";


export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    const findPosts = postsRepository.getPosts()
    res.status(200).send(findPosts)
})
postsRouter.post('/', postPostsValidator, (req: Request, res: Response) => {
    const {title, shortDescription, content, blogId} = req.body
    const createPost = postsRepository.createPost(title, shortDescription, content, blogId)
    res.status(201).send(createPost)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const findPost = postsRepository.getPostById(id)
    if (findPost) {
        res.status(200).send(findPost)
    } else {
        res.send(404)
    }
})
postsRouter.put('/:id', postPostsValidator, (req: Request, res: Response) => {
    const id = req.params.id
    const {title, shortDescription, content, blogId} = req.body
    const updatePost = postsRepository.updatePostById(id, title, shortDescription, content, blogId)
    if (updatePost) {
        const findPost = postsRepository.getPostById(id)
        res.status(204).send(findPost)
    } else {
        res.send(404)
    }
})
postsRouter.delete('/:id', basicAuthMiddleware, (req: Request, res: Response) => {
    const id = req.params.id
    const deletePost = postsRepository.deletePostById(id)
    if (deletePost) {
        res.send(204)
    } else {
        res.send(404)
    }
})