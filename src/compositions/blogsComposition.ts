import "reflect-metadata"
import {Container} from "inversify";
import {BlogsRepository} from "../repositories/blogs-db-repository";
import {BlogsService} from "../domain/blogs-service";
import {BlogsController} from "../controllers/blogsController";


// const blogsRepository = new BlogsRepository()
// const blogsService = new BlogsService(blogsRepository)
// export const blogsController = new BlogsController(blogsService)

export const container = new Container()
container.bind(BlogsController).to(BlogsController)
container.bind(BlogsService).to(BlogsService)
container.bind(BlogsRepository).to(BlogsRepository)
