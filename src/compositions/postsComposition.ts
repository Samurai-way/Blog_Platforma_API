import {PostsRepository} from "../repositories/posts-db-repository";
import {PostsService} from "../domain/posts-service";
import {PostsController} from "../controllers/postsController";


const postsRepository = new PostsRepository()
const postsService = new PostsService(postsRepository)
export const postsController = new PostsController(postsService)