import {testingDbRepository} from "../repositories/testing-db-repository";

export const testingService = {
    async deleteAllData(): Promise<boolean> {
        return await testingDbRepository.deleteAllData()
    }
}