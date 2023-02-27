import "reflect-metadata"
import {PostsRepository} from "../repositories/posts-db-repository";
import {PostsService} from "../domain/posts-service";
import {PostsController} from "../controllers/postsController";
import {Container} from "inversify";


// const postsRepository = new PostsRepository()
// const postsService = new PostsService(postsRepository)
// export const postsController = new PostsController(postsService)

export const container = new Container()
container.bind(PostsController).to(PostsController)
container.bind(PostsService).to(PostsService)
container.bind(PostsRepository).to(PostsRepository)