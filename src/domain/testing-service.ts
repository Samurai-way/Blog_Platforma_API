import {testingDbRepository} from "../repositories/testing-db-repository";

class TestingService {
    async deleteAllData(): Promise<boolean> {
        return await testingDbRepository.deleteAllData()
    }
}

export const testingService = new TestingService()
