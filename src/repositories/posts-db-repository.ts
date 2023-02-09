import {blogsCollection, postsCollection, PostsType} from "../db/db";
import {ObjectId} from "mongodb";


export const postsRepository = {
    async getPosts(): Promise<PostsType[] | undefined> {
        return await postsCollection.find({}).toArray()
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostsType | null> {
        const blog = await blogsCollection.findOne({id: blogId})
        if (!blog) {
            return null
        }
        const newPost: PostsType = {
            _id: (+new Date).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }
        const result = await postsCollection.insertOne(newPost)
        return {
            _id: newPost._id,
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: newPost.blogName,
            createdAt: newPost.createdAt
        }
    },
    async getPostById(id: string): Promise<PostsType | null> {
        const post: PostsType | null = await postsCollection.findOne({id:id})
        if (post) {
            return post
        } else {
            return null
        }
    },
    async updatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await postsCollection.updateOne({id:id}, {
            $set: {
                title: title, shortDescription: shortDescription, content: content, blogId: blogId
            }
        })
        return result.matchedCount === 1
    },
    async deletePostById(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id:id})
        return result.deletedCount === 1
    }
}