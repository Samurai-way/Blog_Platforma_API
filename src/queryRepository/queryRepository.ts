import {blogsService} from "../domain/blogs-service";
import {postsRepository} from "../repositories/posts-db-repository";
import {ObjectId} from "mongodb";
import {DB_User_Type, PostsType} from "../db/db";
import {blogsRepository} from "../repositories/blogs-db-repository";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";
import {usersRepository} from "../repositories/users-db-repository";
import {emailService} from "../domain/email-service";

export const queryRepository = {
    async getBlogByID(id: string) {
        return await blogsService.getBlogById(id)
    },
    async findBlogPostByBlogID(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, blogId: string) {
        return await postsRepository.findBlogPostByBlogID(pageNumber, pageSize, sortBy, sortDirection, blogId)
    },
    async newPost(blogId: string, title: string, shortDescription: string, content: string) {
        const blogName = await blogsRepository.getBlogById(blogId)
        if (!blogName) return false
        const newBlogPost: PostsType = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blogName.name,
            createdAt: new Date().toISOString()
        }
        const result = await postsRepository.createNewBlogPost(newBlogPost)
        return result
    },
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
        await usersRepository.updateUserConfirmationDate(newEmailConfirmation)
        try {
            const bodyTextMessage = `<h1>Thank for your registration</h1>
       <p>To finish registration please follow the link below:
          <a href='https://somesite.com/confirm-email?code=${newEmailConfirmation.emailConfirmation.confirmationCode}'>complete registration</a>
      </p>`
            // `https://somesite.com/confirm-email?code=${newUser.emailConfirmation.confirmationCode}`
            await emailService.sendEmail(email, "confirm code", bodyTextMessage)
        } catch (error) {
            console.log(error)
            return null
        }
        return
    }
}