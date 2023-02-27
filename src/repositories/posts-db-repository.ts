import {paginator} from "../helpers/pagination";
import {CommentsModel, PostsModel} from "../db/db";
import {CommentDBModalType, CommentsType, DB_PostsType, PostsType} from "../types";
import {injectable} from "inversify";

@injectable()
export class PostsRepository {
    async getPosts(pageNumber: number, pageSize: number, sortBy: any, sortDirection: any) {
        const findAndSortedPosts = await PostsModel
            .find({}, {_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean()
        const getCountPosts = await PostsModel.countDocuments({})
        return paginator(pageNumber, pageSize, getCountPosts, findAndSortedPosts)
    }
    async createPostComment(newComment: CommentDBModalType): Promise<CommentsType> {
        const result = await CommentsModel.insertMany(newComment)
        const {_id, postId, ...comment} = newComment
        return comment
    }
    async findBlogPostByBlogID(pageNumber: number, pageSize: number, sortBy: any, sortDirection: any, blogId: string) {
        const findBlog = await PostsModel
            .find({blogId}, {_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean()
        const getCountPosts = await PostsModel.countDocuments({blogId})
        return paginator(pageNumber, pageSize, getCountPosts, findBlog)
    }
    async createPost(newPost: PostsType): Promise<DB_PostsType | null> {
        const result = await PostsModel.insertMany(newPost)
        const {_id, ...postsCopy} = newPost
        return postsCopy
    }
    async createNewBlogPost(newBlogPost: PostsType): Promise<DB_PostsType | null> {
        const result = await PostsModel.insertMany(newBlogPost)
        const {_id, ...newBlogCopy} = newBlogPost
        return newBlogCopy
    }
    async getPostById(id: string): Promise<PostsType | null> {
        return PostsModel.findOne({id}, {_id: 0, __v: 0})
    }
    async updatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await PostsModel.updateOne({id}, {
            $set: {
                title: title, shortDescription: shortDescription, content: content, blogId: blogId
            }
        })
        return result.matchedCount === 1
    }
    async deletePostById(id: string): Promise<boolean> {
        const result = await PostsModel.deleteOne({id})
        return result.deletedCount === 1
    }
}

