import {Request, Response, Router} from "express";

let blogs = []

export const testingRouter = Router({})
testingRouter.delete('/', (req: Request, res: Response) => {
    blogs = []
    res.send(204)
})
