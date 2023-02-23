import {UsersRepository} from "../repositories/users-db-repository";
import {UsersController} from "../controllers/usersController";
import {UsersService} from "../domain/users-service";


const usersRepository = new UsersRepository()
const usersService = new UsersService(usersRepository)
export const usersController = new UsersController(usersService)