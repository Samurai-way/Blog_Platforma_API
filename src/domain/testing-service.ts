import {TestingDbRepository} from "../repositories/testing-db-repository";
import {inject, injectable} from "inversify";

@injectable()
export class TestingService {
    constructor(@inject(TestingDbRepository) protected testingDbRepository: TestingDbRepository) {
    }

    async deleteAllData(): Promise<boolean> {
        return this.testingDbRepository.deleteAllData()
    }
}


