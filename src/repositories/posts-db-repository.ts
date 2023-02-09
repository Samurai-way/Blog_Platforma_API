import {DB_PostsType, postsCollection, PostsType} from "../db/db";
import {ObjectId} from "mongodb";


export const postsRepository = {
    async getPosts(): Promise<PostsType[] | undefined> {
        return await postsCollection.find({}).toArray()
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<DB_PostsType | null> {
        const newPost: PostsType = {
            id: (+new Date).toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: "blog.name",
            createdAt: new Date().toISOString()
        }
        const result = await postsCollection.insertOne(newPost)
        if (result.insertedId) {
            return {
                id: result.insertedId.toString(),
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName: newPost.blogName,
                createdAt: newPost.createdAt
            }
        }
        return null
    },
    async getPostById(id: string): Promise<PostsType | null> {
        const post: PostsType | null = await postsCollection.findOne({_id: new ObjectId(id)})
        if (post) {
            return post
        } else {
            return null
        }
    },
    async updatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await postsCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: title, shortDescription: shortDescription, content: content, blogId: blogId
            }
        })
        return result.matchedCount === 1
    },
    async deletePostById(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    }
}