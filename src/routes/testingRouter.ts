import {Request, Response, Router} from "express";
import {testingService} from "../domain/testing-service";


export const testingRouter = Router({})
testingRouter.delete('/', async (req: Request, res: Response) => {
    const result = await testingService.deleteAllData()
    res.status(204).send(result)
})
