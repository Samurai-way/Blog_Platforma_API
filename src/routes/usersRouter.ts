import {Request, Response, Router} from "express";
import {userPostValidator} from "../validators/validators";
import {usersService} from "../domain/users-service";
import {basicAuthMiddleware} from "../middlewares/basicAuthMiddleware";

export const usersRouter = Router({})

usersRouter.get('/', async (req: Request, res: Response) => {

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