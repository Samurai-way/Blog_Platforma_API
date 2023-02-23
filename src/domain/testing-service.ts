import {TestingDbRepository} from "../repositories/testing-db-repository";

export class TestingService {
    constructor(protected testingDbRepository: TestingDbRepository) {
    }

    async deleteAllData(): Promise<boolean> {
        return this.testingDbRepository.deleteAllData()
    }
}


