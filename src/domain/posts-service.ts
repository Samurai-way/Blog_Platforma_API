import {ObjectId} from "mongodb";
import {PostsRepository} from "../repositories/posts-db-repository";
import {CommentDBModalType, DB_PostsType, DB_User_Type, PostsType} from "../types";
import {BlogsService} from "./blogs-service";
import {blogsRepository} from "../repositories/blogs-db-repository";
import {inject, injectable} from "inversify";
import {LikeStatusRepository} from "../repositories/likeStatus-db-repository";
import {CommentsRepository} from "../repositories/comments-db-repository";
import {postsWithLikeStatus} from "../helpers/postsWithLikeStatus";

@injectable()
export class PostsService {
    blogsService: BlogsService;
    likeStatusRepository: LikeStatusRepository
    commentsRepository: CommentsRepository;

    constructor(@inject(PostsRepository) protected postsRepository: PostsRepository) {
        this.blogsService = new BlogsService(blogsRepository)
        this.likeStatusRepository = new LikeStatusRepository
        this.commentsRepository = new CommentsRepository
    }

    async getPosts(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, userId: string) {
        return this.postsRepository.getPosts(pageNumber, pageSize, sortBy, sortDirection, userId)
    }

    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<DB_PostsType | null> {
        const blogName = await this.blogsService.getBlogById(blogId)
        if (!blogName) return null
        const newPost: PostsType = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blogName.name,
            createdAt: new Date().toISOString(),
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                newestLikes: []
            }
        }
        return this.postsRepository.createPost(newPost)
    }

    async getPostById(postID: string): Promise<PostsType | null> {
        return this.postsRepository.getPostById(postID)
    }

    async findPostByIdWithLikes(postID: string, userId: string) {
        const findPostById = await this.postsRepository.getPostById(postID)
        const postWithLike = await postsWithLikeStatus(findPostById, userId)
        return postWithLike[0]
    }

    async createPostComment(postID: string, user: DB_User_Type, content: string) {
        const findPostByID = await this.postsRepository.getPostById(postID)
        if (!findPostByID) return null
        const newComment: CommentDBModalType = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            postId: findPostByID.id,
            content,
            commentatorInfo: {
                userId: user.id,
                userLogin: user.login
            },
            createdAt: new Date().toISOString(),
            likesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None"
            }

        }
        return this.postsRepository.createPostComment({...newComment})
    }

    async updatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        return this.postsRepository.updatePostById(id, title, shortDescription, content, blogId)
    }

    async deletePostById(id: string): Promise<boolean> {
        return this.postsRepository.deletePostById(id)
    }

    async updateLikeStatusByPostId(postID: string, user: DB_User_Type, likeStatus: string) {
        const findPostById = await this.postsRepository.getPostById(postID)
        if (!findPostById) return null
        return this.likeStatusRepository.updateLikeStatusByCommentId(postID, user.id, user.login, likeStatus)
    }
}

