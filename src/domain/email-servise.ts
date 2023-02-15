import {emailRepository} from "../repositories/email-repository";

export const emailServise = {
    async sendEmail(email: string, subject: string, message: string) {
        return await emailRepository.sendEmail(email, subject, message)
    }
}