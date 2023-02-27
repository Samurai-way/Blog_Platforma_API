import {Request, Response} from "express";
import {getPagination} from "../helpers/pagination";
import {PostsService} from "../domain/posts-service";
import {CommentsService} from "../domain/comments-service";
import {commentsRepository} from "../compositions/commentsComposition";
import {inject, injectable} from "inversify";

@injectable()
export class PostsController {
    commentsService: CommentsService;

    constructor(@inject(PostsService) protected postsService: PostsService) {
        this.commentsService = new CommentsService(commentsRepository)
    }

    async getPosts(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = getPagination(req.query)
        const findPosts = await this.postsService.getPosts(pageNumber, pageSize, sortBy, sortDirection)
        res.status(200).send(findPosts)
    }

    async createPost(req: Request, res: Response) {
        const {title, shortDescription, content, blogId} = req.body
        const createPost = await this.postsService.createPost(title, shortDescription, content, blogId)
        res.status(201).send(createPost)
    }

    async getCommentsByPostId(req: Request, res: Response) {
        const postID = req.params.postID
        const {pageNumber, pageSize, sortBy, sortDirection} = getPagination(req.query)
        const userId = req.user?.id

        const getCommentsAndfindCommentsWithLikes = await this.commentsService.getComments(userId, postID, pageNumber, pageSize, sortBy, sortDirection)
        if (!getCommentsAndfindCommentsWithLikes) return res.send(404)
        res.status(200).send(getCommentsAndfindCommentsWithLikes)
    }

    async createCommentByPostId(req: Request, res: Response) {
        const postID = req.params.postID
        const content = req.body.content
        const user = req.user!
        const createdComment = await this.postsService.createPostComment(postID, user, content)
        if (!createdComment) return res.send(404)
        res.status(201).send(createdComment)
    }

    async getPostById(req: Request, res: Response) {
        const id = req.params.id
        const findPost = await this.postsService.getPostById(id)
        if (!findPost) return res.send(404)
        res.status(200).send(findPost)
    }

    async updatePostById(req: Request, res: Response) {
        const id = req.params.id
        const {title, shortDescription, content, blogId} = req.body
        const updatePost = await this.postsService.updatePostById(id, title, shortDescription, content, blogId)
        if (!updatePost) return res.send(404)
        const findPost = await this.postsService.getPostById(id)
        res.status(204).send(findPost)
    }

    async deletePostById(req: Request, res: Response) {
        const id = req.params.id
        const deletePost = await this.postsService.deletePostById(id)
        if (!deletePost) return res.send(404)
        res.send(204)
    }

    async updateLikeStatusByPostId(req: Request, res: Response) {
        const postID = req.params.postID
        const user = req.user!
        const likeStatus = req.body.likeStatus
        const findPostById = await this.postsService.updateLikeStatusByPostId(postID, user, likeStatus)
        if (!findPostById) return res.sendStatus(404)
        res.sendStatus(204)
    }
}

