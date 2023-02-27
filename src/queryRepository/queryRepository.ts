import {ObjectId} from "mongodb";
import {blogsRepository} from "../repositories/blogs-db-repository";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";
import {BlogsPost, DB_User_Type} from "../types";
import {BlogsService} from "../domain/blogs-service";
import {PostsRepository} from "../repositories/posts-db-repository";
import {UsersRepository} from "../repositories/users-db-repository";
import {emailService} from "../compositions/emailComposition";
import {CommentsRepository} from "../repositories/comments-db-repository";


export class QueryRepository {
    postsRepository: PostsRepository;
    usersRepository: UsersRepository;
    blogsService: BlogsService;
    commentsRepository: CommentsRepository;

    constructor() {
        this.postsRepository = new PostsRepository()
        this.blogsService = new BlogsService(blogsRepository)
        this.usersRepository = new UsersRepository()
        this.commentsRepository = new CommentsRepository()
    }

    async getCommentByIdWithLikeStatus(commentId: string, userId: string) {
        const findComment = await this.commentsRepository.getCommentById(commentId)
        if (!findComment) return null
        const findLikes = await this.commentsRepository.getLikes(commentId)
        const findDislikes = await this.commentsRepository.getDislikes(commentId)
        let findStatus = 'None'
        if (userId) {
            const find = await this.commentsRepository.getStatus(commentId, userId)
            if (find) {
                findStatus = find.likeStatus
            }
        }
        findComment.likesInfo.likesCount = findLikes
        findComment.likesInfo.dislikesCount = findDislikes
        findComment.likesInfo.myStatus = findStatus

        return findComment
    }

    async findPostByBlogID(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, blogId: string, userId: string) {
        const findBlog = await blogsRepository.getBlogById(blogId)
        if (!findBlog) return null
        return  this.postsRepository.findPostByBlogIDWithPagination(pageNumber, pageSize, sortBy, sortDirection, blogId, userId)
    }

    async newPost(blogId: string, title: string, shortDescription: string, content: string) {
        const findBlogById = await blogsRepository.getBlogById(blogId)
        if (!findBlogById) return null
        const newBlogPost: BlogsPost = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: findBlogById.name,
            createdAt: new Date().toISOString(),
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                newestLikes: []
            }
        }
        const result = this.postsRepository.createNewBlogPost(newBlogPost)
        return result
    }

    async resendingEmail(email: string, user: DB_User_Type) {
        const code = uuidv4()
        const newEmailConfirmation: DB_User_Type = {
            _id: new ObjectId(),
            id: user.id,
            login: user.login,
            email: email,
            createdAt: new Date().toISOString(),
            passwordHash: user.passwordHash,
            emailConfirmation: {
                confirmationCode: code,
                expirationDate: add(new Date, {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: false
            }
        }
        await this.usersRepository.updateUserConfirmationDate(newEmailConfirmation)
        try {
            const bodyTextMessage = `<h1>Thank for your registration</h1>
       <p>To finish registration please follow the link below:
          <a href='https://somesite.com/confirm-email?code=${newEmailConfirmation.emailConfirmation.confirmationCode}'>complete registration</a>
      </p>`
            await emailService.sendEmail(email, "confirm code", bodyTextMessage)
        } catch (error) {
            console.log(error)
            return null
        }
        return
    }
}
