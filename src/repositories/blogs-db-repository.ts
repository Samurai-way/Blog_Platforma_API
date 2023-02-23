import {paginator} from "../helpers/pagination";
import {BlogsType, DB_BlogsType} from "../types";
import {BlogsModel} from "../db/db";

export class BlogsRepository {
    async getBlogs(searchNameTerm: string, sortBy: any, sortDirection: any, pageNumber: number, pageSize: number) {
        const findAndSortedBlogs = await BlogsModel
            .find({name: {$regex: searchNameTerm, $options: 'i'}}, {_id: 0, __v: 0})
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean()
        const getCountBlogs = await BlogsModel.countDocuments({name: {$regex: searchNameTerm, $options: "i"}})
        return paginator(pageNumber, pageSize, getCountBlogs, findAndSortedBlogs)
    }

    async createBlog(newBlog: DB_BlogsType): Promise<BlogsType> {
        const result = await BlogsModel.insertMany(newBlog)
        const {_id, ...blogsCopy} = newBlog
        return blogsCopy
    }

    async getBlogById(id: string): Promise<BlogsType | null> {
        return BlogsModel.findOne({id}, {_id: 0, __v: 0})
    }

    async updateBlogById(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await BlogsModel.updateOne({id}, {
            $set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }
        })
        return result.matchedCount === 1
    }

    async deleteBlog(id: string): Promise<boolean> {
        const result = await BlogsModel.deleteOne({id})
        return result.deletedCount === 1
    }
}

export const blogsRepository = new BlogsRepository()