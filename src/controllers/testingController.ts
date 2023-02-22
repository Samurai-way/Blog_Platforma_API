import {Request, Response} from "express";
import {testingService} from "../domain/testing-service";

class TestingController {
    async delete(req: Request, res: Response){
        const result = await testingService.deleteAllData()
        res.status(204).send(result)
    }
}
export const testingController = new TestingController()