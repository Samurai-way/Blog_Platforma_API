import {blogsService} from "../domain/blogs-service";
import {PostsType} from "../db/db";

export const queryRepository = {
    async getBlogByID(id: string){
        return await blogsService.getBlogById(id)
    },
    async findBlogPost(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, blogId: string){

    }
}