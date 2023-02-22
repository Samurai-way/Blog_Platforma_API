import {Request, Response} from "express";
import {getPagination} from "../helpers/pagination";
import {usersService} from "../domain/users-service";

class UsersController {
    async getUsers(req: Request, res: Response){
        const {sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm} = getPagination(req.query)
        const findValue = await usersService.getUser(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
        res.status(200).send(findValue)
    }
    async createUser(req: Request, res: Response){
        const {login, password, email} = req.body
        const newUser = await usersService.createUser(login, password, email)
        res.status(201).send(newUser)
    }
    async deleteUserById(req: Request, res: Response) {
        const id = req.params.id
        const deleteUser = await usersService.deleteUser(id)
        if (!deleteUser) return res.sendStatus(404)
        res.send(204)
    }
}
export const usersController = new UsersController()