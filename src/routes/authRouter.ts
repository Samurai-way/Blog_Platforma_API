import {Request, Response, Router} from "express";


export const authRouter = Router({})

authRouter.post('/', async (req: Request, res: Response) => {
    const {loginOrEmail, password} = req.body
    // const checkResult = await
})