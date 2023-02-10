import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-db-repository";
import {postPostsValidator} from "../validators/validators";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {postsService} from "../domain/posts-service";


export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const findPosts = await postsService.getPosts()
    res.status(200).send(findPosts)
})
postsRouter.post('/', postPostsValidator, async (req: Request, res: Response) => {
    const {title, shortDescription, content, blogId} = req.body
    const createPost = await postsService.createPost(title, shortDescription, content, blogId)
    res.status(201).send(createPost)
})
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const findPost = await postsService.getPostById(id)
    if (findPost) {
        res.status(200).send(findPost)
    } else {
        res.send(404)
    }
})
postsRouter.put('/:id', postPostsValidator, async (req: Request, res: Response) => {
    const id = req.params.id
    const {title, shortDescription, content, blogId} = req.body
    const updatePost = await postsService.updatePostById(id, title, shortDescription, content, blogId)
    if (updatePost) {
        const findPost = await postsService.getPostById(id)
        res.status(204).send(findPost)
    } else {
        res.send(404)
    }
})
postsRouter.delete('/:id', basicAuthMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id
    const deletePost = await postsService.deletePostById(id)
    if (deletePost) {
        res.send(204)
    } else {
        res.send(404)
    }
})