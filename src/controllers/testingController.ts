import {Request, Response} from "express";
import {TestingService} from "../domain/testing-service";


export class TestingController {
    constructor(protected testingService: TestingService) {
    }
    async delete(req: Request, res: Response){
        const result = await this.testingService.deleteAllData()
        res.status(204).send(result)
    }
}
