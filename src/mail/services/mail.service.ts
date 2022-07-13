import { Injectable } from '@nestjs/common';
// import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
    // constructor(private mailerService: MailerService) {}

    async send(params: { template: string; subject: string; context: any; from: string; to: string }) {
        // const { from, to, subject, template, context } = params;
        // return await this.mailerService.sendMail({ from, to, subject, template, context });
    }
}
