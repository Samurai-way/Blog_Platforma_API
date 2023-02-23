import {UsersSessionRepository} from "../repositories/usersSession-db-repository";
import {UserSessionService} from "../domain/userSession-service";


export const usersSessionRepository = new UsersSessionRepository()
export const usersSessionService = new UserSessionService(usersSessionRepository)
