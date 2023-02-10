import {blogsService} from "../domain/blogs-service";
import {postsRepository} from "../repositories/posts-db-repository";

export const queryRepository = {
    async getBlogByID(id: string) {
        return await blogsService.getBlogById(id)
    },
    async findBlogPost(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, blogId: string) {
        return await postsRepository.findBlogPost(pageNumber, pageSize, sortBy, sortDirection, blogId)
    }
}