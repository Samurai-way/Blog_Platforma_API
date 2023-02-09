import {postsCollection, PostsType} from "../db/db";
import {ObjectId} from "mongodb";


export const postsRepository = {
    async getPosts(): Promise<PostsType[] | undefined> {
        return await postsCollection.find({}).toArray()
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: number): Promise<PostsType> {
        const newPost: PostsType = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: 'first',
            createdAt: new Date()
        }
        const result = await postsCollection.insertOne(newPost)
        return newPost
    },
    async getPostById(id: string): Promise<PostsType | null> {
        const post: PostsType | null = await postsCollection.findOne({_id: new ObjectId(id)})
        if (post) {
            return post
        } else {
            return null
        }
    },
    async updatePostById(id: string, title: string, shortDescription: string, content: string, blogId: number): Promise<boolean> {
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