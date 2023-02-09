import {Request, Response, Router} from "express";
import {testingDbRepository} from "../repositories/testing-db-repository";



export const testingRouter = Router({})
testingRouter.delete('/', async (req: Request, res: Response) => {
    const result = await testingDbRepository.deleteAllData()
    res.status(204).send(result)
})
