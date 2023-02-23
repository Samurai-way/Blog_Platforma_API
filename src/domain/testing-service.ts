import {TestingDbRepository} from "../repositories/testing-db-repository";

export class TestingService {
    testingDbRepository: TestingDbRepository;

    constructor() {
        this.testingDbRepository = new TestingDbRepository()
    }

    async deleteAllData(): Promise<boolean> {
        return this.testingDbRepository.deleteAllData()
    }
}


