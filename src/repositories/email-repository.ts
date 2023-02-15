import nodemailer from 'nodemailer'

export const emailRepository = {
    async sendEmail(email: string, subject: string, message: string){
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'user2023newTestPerson@gmail.com',
                pass: '1q2w3e4r5tniki'
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