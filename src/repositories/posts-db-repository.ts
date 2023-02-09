import {DB_PostsType, postsCollection, PostsType} from "../db/db";
import {ObjectId} from "mongodb";


export const postsRepository = {
    async getPosts(): Promise<PostsType[] | undefined> {
        return await postsCollection.find({}, {projection: {_id: 0}}).toArray()
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<DB_PostsType | null> {
        const newPost: PostsType = {
            id: new ObjectId().toString(),
            _id: new ObjectId(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: "blog.name",
            createdAt: new Date().toISOString()
        }
        const result = await postsCollection.insertOne(newPost)
        const {_id, ...postsCopy} = newPost
        return postsCopy
    },
    async getPostById(id: string): Promise<PostsType | boolean> {
        const post: PostsType | null = await postsCollection.findOne({id}, {projection: {_id: 0}})
        if (!post) return false
        return post
    },
    async updatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        const result = await postsCollection.updateOne({id}, {
            $set: {
                title: title, shortDescription: shortDescription, content: content, blogId: blogId
            }
        })
        return result.matchedCount === 1
    },
    async deletePostById(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}