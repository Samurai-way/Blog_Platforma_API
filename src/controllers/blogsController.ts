import {Request, Response} from "express";
import {getPagination} from "../helpers/pagination";
import {blogsService} from "../domain/blogs-service";
import {queryRepository} from "../queryRepository/queryRepository";

class BlogsController{
    async getBlogs(req: Request, res: Response){
        const {searchNameTerm, sortBy, sortDirection, pageNumber, pageSize} = getPagination(req.query)
        const findBlogs: any = await blogsService.getBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
        res.status(200).send(findBlogs)
    }
    async createBlog(req: Request, res: Response){
        const {name, description, websiteUrl} = req.body
        const newBlog = await blogsService.createBlog(name, description, websiteUrl)
        res.status(201).send(newBlog)
    }
    async createPostByBlogId(req: Request, res: Response){
        const id = req.params.id
        const {title, shortDescription, content} = req.body
        const findBlog = await queryRepository.getBlogByID(id)
        if (!findBlog) return res.sendStatus(404)
        const newPost = await queryRepository.newPost(id, title, shortDescription, content)
        res.status(201).send(newPost)
    }
    async getBlogById(req: Request, res: Response){
        const id = req.params.id
        const findVideo = await blogsService.getBlogById(id)
        if (!findVideo) return res.send(404)
        res.status(200).send(findVideo)

    }
    async getPostsByBlogId(req: Request, res: Response){
        const id = req.params.id
        const {pageNumber, pageSize, sortBy, sortDirection} = getPagination(req.query)
        const findBlog = await queryRepository.getBlogByID(id)
        if (!findBlog) return res.send(404)
        const findBlogPost = await queryRepository.findBlogPostByBlogID(pageNumber, pageSize, sortBy, sortDirection, id)
        res.status(200).send(findBlogPost)
    }
    async updateBlogById(req: Request, res: Response){
        const id = req.params.id
        const {name, description, websiteUrl} = req.body
        const updateBlog = await blogsService.updateBlogById(id, name, description, websiteUrl)
        if (!updateBlog) return res.send(404)
        const blog = await blogsService.getBlogById(id)
        res.status(204).send(blog)
    }
    async deleteBlogById(req: Request, res: Response){
        const id = req.params.id
        const deleteBlog = await blogsService.deleteBlog(id)
        if (!deleteBlog) return res.send(404)
        res.send(204)
    }
}
export const blogsController = new BlogsController()