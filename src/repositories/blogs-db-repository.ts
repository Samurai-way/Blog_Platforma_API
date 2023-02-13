import {blogsCollection, BlogsType, DB_BlogsType} from "../db/db";
import {paginator} from "../helpers/pagination";

export const blogsRepository = {
    async getBlogs(searchNameTerm: string, sortBy: any, sortDirection: any, pageNumber: number, pageSize: number) {
        const findAndSortedBlogs = await blogsCollection
            .find({name: {$regex: searchNameTerm, $options: 'i'}}, {projection: {_id: 0}})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const getCountBlogs = await blogsCollection.countDocuments({name: {$regex: searchNameTerm, $options: "i"}})
        return paginator(pageNumber, pageSize, getCountBlogs, findAndSortedBlogs)
    },
    async createBlog(newBlog: DB_BlogsType): Promise<BlogsType> {
        const result = await blogsCollection.insertOne(newBlog)
        const {_id, ...blogsCopy} = newBlog
        return blogsCopy
    },
    async getBlogById(id: string): Promise<BlogsType | null> {
        return blogsCollection.findOne({id}, {projection: {_id: 0}})
    },
    async updateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne({id}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }
        })
        return result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}