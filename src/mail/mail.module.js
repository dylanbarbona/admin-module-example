"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MailModule = void 0;
// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
var common_1 = require("@nestjs/common");
var mail_service_1 = require("./services/mail.service");
var MailModule = /** @class */ (function () {
    function MailModule() {
    }
    MailModule = __decorate([
        (0, common_1.Module)({
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
            providers: [mail_service_1.MailService],
            exports: [mail_service_1.MailService]
        })
    ], MailModule);
    return MailModule;
}());
exports.MailModule = MailModule;
