import {AttemptsModel} from "../db/db";

class AttemptsRepository {
    async addAttempts(userIP: string, url: string, time: Date) {
        return AttemptsModel.insertMany({userIP, url, time})
    }
    async countOfAttempts(userIP: string, url: string, timeLimit: Date) {
        return AttemptsModel.countDocuments({userIP, url, time: {$gt: timeLimit}})
    }
}

export const attemptsRepository = new AttemptsRepository()
