import {Request, Response, Router} from "express";
import {userPostValidator, usersGetValidator} from "../validators/validators";
import {usersService} from "../domain/users-service";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";
import {getPagination} from "../helpers/pagination";

export const usersRouter = Router({})

usersRouter.get('/', usersGetValidator, async (req: Request, res: Response) => {
    const {sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm} = getPagination(req.query)
    const findValue = usersService.getUser(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
    res.status(200).send(findValue)
})
usersRouter.post('/', userPostValidator, async (req: Request, res: Response) => {
    const {login, password, email} = req.body
    const newUser = await usersService.createUser(login, password, email)
    res.status(201).send(newUser)
})
usersRouter.delete('/:id', basicAuthMiddleware, async (req: Request, res: Response) => {
    const id = req.params.id
    const deleteUser = await usersService.deleteUser(id)
    if (!deleteUser) return res.sendStatus(404)
    res.send(204)
})