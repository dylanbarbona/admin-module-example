// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { join } from 'path';

@Module({
    imports: [
        // MailerModule.forRoot({
        //     transport: {
        //         host: process.env.MAIL_HOST || 'smtp.example.com',
        //         secure: Boolean(process.env.MAIL_SECURE || false),
        //         auth: {
        //             user: process.env.MAIL_USER || 'user@example.com',
        //             pass: process.env.MAIL_PASSWORD || 'topsecret',
        //         },
        //     },
        //     defaults: {
        //         from: process.env.MAIL_FROM || '"No Reply" <noreply@example.com>',
        //     },
        //     template: {
        //         dir: join(__dirname, 'templates'),
        //         adapter: new HandlebarsAdapter(),
        //         options: {
        //             strict: true,
        //         },
        //     },
        // }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
