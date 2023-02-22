import nodemailer from 'nodemailer'

class EmailRepository {
    async sendEmail(email: string, subject: string, message: string){
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'user2023newTestPerson@gmail.com',
                pass: 'chucmvqgtpkxstks'
            }
        })

        return await transport.sendMail({
            from: `Oleg <olegmoishevych@gmail.com>`,
            to: email,
            subject: subject,
            html: message
        })
    }
}
export const emailRepository = new EmailRepository()