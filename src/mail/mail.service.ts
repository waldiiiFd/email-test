import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(mail: string, name: string) {
        await this.mailerService.sendMail({
            to: mail,
            subject: 'Bienvenido al sistema!',
            template: './welcome',
            context: {
                name: name,
            },
        });
    }
}
