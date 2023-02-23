import {Request, Response} from "express";
import {TestingService} from "../domain/testing-service";


class TestingController {
    testingService: TestingService;
    constructor() {
        this.testingService = new TestingService()
    }
    async delete(req: Request, res: Response){
        const result = await this.testingService.deleteAllData()
        res.status(204).send(result)
    }
}
export const testingController = new TestingController()