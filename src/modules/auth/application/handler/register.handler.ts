import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { AuthRepository } from "../../domain/contracts/auth.repository";
import { RegisterCommand } from "../../domain/commands/register.command";
const bcrypt = require('bcrypt');

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
    constructor(
        @Inject('AuthRepository') private repository: AuthRepository,
        private jwtService: JwtService) {}

    async execute(command: RegisterCommand) {
        let password = bcrypt.hashSync(command.password, Number(process.env.HASH_SALT))
        const user = await this.repository.create(command.name, command.email, password)
        return this.jwtService.sign(user)
    }
}
