import { UserLoggedInEvent } from "../../domain/events/user-logged-in.event";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { User } from "../../domain/entities/user.entity";
import {Logger} from "@nestjs/common";
import {MailService} from "../../../../mail/services/mail.service";

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInListener implements IEventHandler<UserLoggedInEvent> {
    constructor(private mailService: MailService) {}

    async handle({ user }: UserLoggedInEvent) {
        try {
            // return await this.mailService.send({
            //     from: user.email,
            //     to: user.email,
            //     subject: "Welcome to the application",
            //     template: "welcome",
            //     context: {
            //         name: user.name,
            //     },
            // });
        } catch (error) {
            Logger.error('Error sending email', error.message);
        }
    }
}
