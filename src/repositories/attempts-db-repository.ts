import {attemptsCollection} from "../db/db";


export const attemptsRepository = {
    async addAttempts(userIP: string, url: string, time: Date) {
        return attemptsCollection.insertOne({userIP, url, time})
    },
    async countOfAttempts(userIP: string, url: string, timeLimit: Date) {
        return attemptsCollection.countDocuments({userIP, url, time: {$gt: timeLimit}})
    }
}