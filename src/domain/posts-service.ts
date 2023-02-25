import {ObjectId} from "mongodb";
import {PostsRepository} from "../repositories/posts-db-repository";
import {CommentDBModalType, DB_PostsType, DB_User_Type, PostsType} from "../types";
import {BlogsService} from "./blogs-service";
import {blogsRepository} from "../repositories/blogs-db-repository";

export class PostsService {
    blogsService: BlogsService;

    constructor(protected postsRepository: PostsRepository) {
        this.blogsService = new BlogsService(blogsRepository)
    }

    async getPosts(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string) {
        return this.postsRepository.getPosts(pageNumber, pageSize, sortBy, sortDirection)
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
            createdAt: new Date().toISOString()
        }
        return this.postsRepository.createPost(newPost)
    }

    async getPostById(postID: string): Promise<PostsType | null> {
        return this.postsRepository.getPostById(postID)
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
}

