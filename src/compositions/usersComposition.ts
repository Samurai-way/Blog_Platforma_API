import {UsersRepository} from "../repositories/users-db-repository";
import {UsersController} from "../controllers/usersController";
import {UsersService} from "../domain/users-service";
import {Container} from "inversify";


// const usersRepository = new UsersRepository()
// const usersService = new UsersService(usersRepository)
// export const usersController = new UsersController(usersService)

export const container = new Container()
container.bind(UsersController).to(UsersController)
container.bind(UsersService).to(UsersService)
container.bind(UsersRepository).to(UsersRepository)